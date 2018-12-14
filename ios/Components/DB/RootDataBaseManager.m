//
//  RootDataBaseManager.m
//  XingLiIM
//
//  Created by Mjwon on 2017/2/28.
//  Copyright © 2017年 Nemo. All rights reserved.
//

#import "RootDataBaseManager.h"
#import <UIKit/UIKit.h>

@implementation RootDataBaseManager

/** 创建表（用item：模型，name：表名来创建） */

-(BOOL)creatTabelWithKeys:(id)keys isId:(BOOL)is tableName:(NSString *)tableName{
    
    if ([_dataBase open]) {
        return [self creatTabelKeys:keys isId:is tableName:tableName];
    }
    
    return nil;
}
+(instancetype)rootDataBaseManagerForQueue:(FMDatabaseQueue *)queue{
    
    RootDataBaseManager *db = [[self alloc] init];
    db.queue = queue;
    
    return db;
}
-(NSString *)updateSQLForDict:(NSDictionary *)dict condition:(NSString *)condition tableName:(NSString *)tableName{

    NSMutableString *sql = [NSMutableString stringWithFormat:@"update %@ set ",tableName];
    NSString *string = nil;
    NSArray *keys = [dict allKeys];
    for (int i = 0; i < keys.count; i ++) {
        NSString *key = keys[i];
        if (![key isEqualToString:@"userId"]) {
            NSString *str = [NSString stringWithFormat:@"%@ = '%@'",key,dict[key]];
            NSString *tag = (i == keys.count - 1)?@" ":@",";
            [sql appendFormat:@"%@%@",str,tag];
        }else{
            if (i == keys.count - 1) {
                if ([[sql substringFromIndex:sql.length-1] isEqualToString:@","]) {
                    sql = [NSMutableString stringWithFormat:@"%@",[sql substringToIndex:sql.length-1]];
                }
            }
        }
        if ([key isEqualToString:condition]) {
            string = [NSString stringWithFormat:@"%@ = '%@'",key,dict[key]];
        }
        
    }
    NSAssert(string != nil, @"更新SQL的语句为空！");
    [sql appendFormat:@" where %@",string];
    
    return sql;

}

-(BOOL)updateDataWithDict:(NSDictionary *)dict condition:(NSString *)condition tableName:(NSString *)tableName{
    
    NSString *sql = [self updateSQLForDict:dict condition:condition tableName:tableName];
    
    __block BOOL b = nil;
    
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        b =[db executeUpdate:sql];
    }];
    
    return  b;
    
}
/** 更新多条数据 */
-(BOOL)updateDataWithArray:(NSArray<NSDictionary *>*)array condition:(NSString *)condition tableName:(NSString *)tableName{
    
    NSMutableArray *transactionSql= [[NSMutableArray alloc]init];
    
    for (int j = 0; j < array.count; j ++) {
        NSDictionary *dict = array[j];
        
        [transactionSql addObject:[self updateSQLForDict:dict condition:condition tableName:tableName]];
    }
    return [self tarray:transactionSql asyncName:"RootDataBaseManagerUpateNewsDataWithArray"];
}

-(NSString *)insertSQLForDict:(NSDictionary *)dict tableName:(NSString *)tableName
{

    NSString *format = [NSString stringWithFormat:@"insert into %@ (",tableName];
    NSMutableString *valuesFlag = [NSMutableString stringWithString:@"values ("];
    
    NSMutableString *sql = [NSMutableString string];
    
    NSArray *keys = [dict allKeys];
    
    for (int i = 0 ; i < keys.count; i ++) {
        NSString *key = keys[i];
        NSString *value = [NSString stringWithFormat:@"%@",dict[key]];
        
        if ([value containsString:@"'"]) {
            NSMutableString *newValue = [NSMutableString stringWithString:value];
            NSRange range = [newValue rangeOfString:@"'"];
            [newValue insertString:@"'"atIndex:range.location];
            value = newValue;
        }
        if (i == keys.count -1) {
            [sql appendFormat:@"%@)",key];
            [valuesFlag appendFormat:@"'%@') ",value];
        }else{
            [valuesFlag appendFormat:@"'%@',",value];
            [sql appendFormat:@"%@,",key];
        }
//            NSLog(@"key:%@ valuesFlag:%@",key,valuesFlag);
    }
    [sql appendString:valuesFlag];
    
    return  [NSString stringWithFormat:@"%@ %@",format,sql];
}

-(BOOL)insertNewsData:(id)dict tableName:(NSString *)tableName
{
    return [self insertNewsDataWithArray:@[dict] tableName:tableName];
}


/** 插入多条数据 */
-(BOOL)insertNewsDataWithArray:(NSArray *)array tableName:(NSString *)tableName{
    
    //数据库事务方法 语句组
    NSMutableArray *transactionSql= [[NSMutableArray alloc]init];
    
    for (int j = 0; j < array.count; j ++) {
        id dict = array[j];
//        NSLog(@"%@",dict);
        
        [transactionSql addObject:[self insertSQLForDict:dict tableName:tableName]];
    }
    
    return [self tarray:transactionSql asyncName:"RootDataBaseManagerInsertNewsDataWithArray"];
}
-(BOOL)tarray:(NSArray *)array asyncName:(char *)name{
    
    __block BOOL a = NO;
    NSLog(@"%s启动事务",__func__);
    NSDate *date = [NSDate date];
    
    __weak typeof(self) ws = self;
    dispatch_async(dispatch_queue_create(name, DISPATCH_QUEUE_CONCURRENT), ^{
        
        [ws.queue inDatabase:^(FMDatabase *db) {
            
            for (int i = 0; i < array.count; ++i) {
                
                NSString *sql =  array[i];
                [db open];
                BOOL res = [db executeUpdate:sql];
                
                if (!res) {
                    NSLog(@"error to inster data: %@  %@", sql,[NSThread currentThread]);
                    
                    a = res;
                } else {
                    a = YES;
//                    NSLog(@"成功插入SQL为: %@", sql);
                }
                
            }
            
        }];
        
    });
    
    CGFloat interval = [[NSDate date] timeIntervalSinceDate:date];
    NSLog(@"总耗时：%f", interval);
    
    return a;
}

#pragma mark 数据是不是存在

-(BOOL)verifyDataWithDict:(NSDictionary *)dict relationship:(NSArray *)relationships tableName:(NSString *)tableName{
    
    NSAssert((relationships.count + 1 == dict.count), @"数据与关系不一致！");
    
    NSArray *keys = [dict allKeys];
    
    NSMutableString *vk = [NSMutableString string];
    
    for (int i = 0 ; i < keys.count; i ++) {
        NSString *key = keys[i];
        NSString *value = [NSString stringWithFormat:@"%@",dict[key]];
        [vk appendFormat:@"%@ = '%@'",key,value];
        if (i % 2 == 0 && keys.count > 1 && i > 0) {
            [vk appendFormat:@"%@",relationships[i-1]];
        }
        
    }
    
    NSString * sql = [NSString stringWithFormat:@"select count(*) from %@ where %@",tableName,vk];
    __block BOOL b = nil;
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        b = [db intForQuery:sql] > 0;
    }];
    return b;
}

-(NSArray *)carryForOutsql:(NSString *)sql tableName:(NSString *)tableName{

    __block NSMutableArray * dataArray = [[NSMutableArray alloc] init];
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        FMResultSet * result = [db executeQuery:sql];
        
        //    保存数据库中所有的数据
        while (result.next) {
            if ([result stringForColumn:@"userId"] != nil) {
                [dataArray addObject:[result stringForColumn:@"userId"]];
            }
        }
    }];
    
    return dataArray;
}
/** 执行sql语句返回数据 */
-(NSArray *)carryOutsql:(NSString *)sql tableName:(NSString *)tableName{

    __block NSMutableArray * dataArray = [[NSMutableArray alloc] init];
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        FMResultSet * result = [db executeQuery:sql];
        
        //    保存数据库中所有的数据
        while (result.next) {
            NSDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[result resultDictionary]];
            [dataArray addObject:dict];
        }
        
    }];
    
    return dataArray;
    
}
/** 通过表名与条件查询数据 */
-(NSArray *)getDataWithTableName:(NSString *)tableName condition:(NSString *)condition conditionBack:(NSString *)conditionBack order:(NSString *)order
{
    NSAssert(condition.length > 0, @" condition 不能为空！");
    if (conditionBack.length == 0) {
        conditionBack = @"*";
    }
    NSString * sql = [NSString stringWithFormat:@"select %@ from %@ where %@ %@",conditionBack,tableName,condition,order];
    __block NSMutableArray * dataArray = [[NSMutableArray alloc] init];
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        FMResultSet * result = [db executeQuery:sql];
        
        //    保存数据库中所有的数据
        while (result.next) {
            NSDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[result resultDictionary]];
            [dataArray addObject:dict];
        }
        
    }];
    
    return dataArray;
}

/** 通过表名查询所有 */
-(NSArray *)getAllDataTableName:(NSString *)tableName order:(NSString *)order{
    
    NSString * sql = [NSString stringWithFormat:@"select * from %@ %@",tableName,order];
    __block NSMutableArray * dataArray = [[NSMutableArray alloc] init];
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        FMResultSet * result = [db executeQuery:sql];
        
        //    保存数据库中所有的数据
        while (result.next) {
            NSDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[result resultDictionary]];
            [dataArray addObject:dict];
        }
        
    }];
    
    return dataArray;
}
-(NSArray *)inquireDataWithDict:(NSDictionary *)dict tableName:(NSString *)tableName{
    
    NSString *key = [[dict allKeys] firstObject];
    NSString * sql = [NSString stringWithFormat:@"select * from %@ where %@ = '%@'",tableName,key,dict[key]];
    __block NSMutableArray * dataArray = [[NSMutableArray alloc] init];
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        FMResultSet * result = [db executeQuery:sql];
        
        //    保存数据库中所有的数据
        while (result.next) {
            NSDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[result resultDictionary]];
            [dataArray addObject:dict];
        }
        
    }];
    
    return dataArray;

}
-(BOOL)creatTabelKeys:(NSArray *)keys isId:(BOOL)is tableName:(NSString *)tableName{
    
    NSString *Id = @"";
    if (is) {
        Id = @"id integer primary key autoincrement,";
    }
    NSMutableString *sql = [NSMutableString stringWithFormat:@"create table if not exists %@ (%@",tableName,Id];
    NSMutableString *sentence = [NSMutableString string];
    
    NSString *typeStr = @"text";
//    NSString *defaults = @"DEFAULT 0";
    for (int i = 0 ; i < keys.count; i ++) {
        NSString *key = keys[i];
        NSString *symbol = (i == keys.count -1)?@")":@",";
        [sentence appendString:[NSString stringWithFormat:@"%@ %@ %@",key,typeStr,symbol]];
    }
    
    [sql appendString:sentence];
    
    NSLog(@"创建表的sql:%@",sql);
    
    BOOL b = NO;
    if ([_dataBase open]){
        b = [_dataBase  executeUpdate:sql];
        [_dataBase close];
        return b;
    }
    
    if (b) {
        NSLog(@"表格创建或打开成功");
    } else{
        NSLog(@"表格创建失败:%@",[NSThread currentThread]);
    }
    
    return b;
}

/** 判断表中是否有这个字段,没有就添加 */
-(BOOL)isExistDataByArray:(NSArray *)array tableName:(NSString *)tableName{
    
    for (int i = 0; i < array.count; i ++) {
        NSString *name = array[i];
        BOOL a = [self isExistDataByString:name tableName:tableName];
        if (!a) {
            [self addDataByString:name tableName:tableName];
        }
    }
    
    return NO;
}
-(BOOL)isExistDataByString:(NSString *)name tableName:(NSString *)tableName{
    
    __block BOOL b = NO;
    
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        b = [db columnExists:name inTableWithName:tableName];
        //        NSLog(@"%@--%d",name,b);
    }];
    
    return b;
}
-(void)addDataByString:(NSString *)name tableName:(NSString *)tableName{
    
    NSString * sql = [NSString stringWithFormat:@"ALTER TABLE %@ ADD %@ text",tableName,name];
    
    __block BOOL isOk = NO;
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        isOk = [db executeUpdate:sql,name];
    }];
    
}

/** 通过条件表名批量删除数据 */
-(BOOL)deleteDataForCondition:(NSString *)condition tableName:(NSString *)tableName{
    
    if (!tableName || tableName.length == 0) {
        return NO;
    }
    
    NSString * sql = [NSString stringWithFormat:@"delete from %@ where  %@",tableName,condition];
    __block BOOL isOk = NO;
    
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        isOk = [db executeUpdate:sql];
    }];
    
    return isOk;
}

/** 通过表名删除所有数据 */
-(BOOL)deleteAllForTableName:(NSString *)tableName{
    
    if (!tableName || tableName.length == 0) {
        return NO;
    }
    
    NSString * sql = [NSString stringWithFormat:@"delete from %@",tableName];
    __block BOOL isOk = NO;
    
    [_queue inDatabase:^(FMDatabase *db) {
        [db open];
        isOk = [db executeUpdate:sql];
    }];
    
    return isOk;
}

@end
