//
//  RootDataBaseManager.h
//  XingLiIM
//
//  Created by Mjwon on 2017/2/28.
//  Copyright © 2017年 Nemo. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FMDB.h"

@interface RootDataBaseManager : NSObject

@property (retain,nonatomic)FMDatabase * dataBase;
@property (nonatomic ,retain) FMDatabaseQueue *queue;

+(instancetype)rootDataBaseManagerForQueue:(FMDatabaseQueue *)queue;

-(BOOL)creatTabelWithKeys:(id)keys isId:(BOOL)is tableName:(NSString *)tableName;

/** 插入数据 */
-(BOOL)insertNewsData:(id)dict tableName:(NSString *)tableName;

/** 插入多条数据 */
-(BOOL)insertNewsDataWithArray:(NSArray *)array tableName:(NSString *)tableName;

/** 通过表名查询所有 */
-(NSArray *)getAllDataTableName:(NSString *)tableName  order:(NSString *)order;

/** 数据是不是存在 */
-(BOOL)verifyDataWithDict:(NSDictionary *)dict relationship:(NSArray *)relationships tableName:(NSString *)tableName;

/** 更新单条数据 */
-(BOOL)updateDataWithDict:(NSDictionary *)dict condition:(NSString *)condition tableName:(NSString *)tableName;
/** 更新多条数据 */
-(BOOL)updateDataWithArray:(NSArray<NSDictionary *>*)array condition:(NSString *)condition tableName:(NSString *)tableName;

/** 查询数据 */
-(NSArray *)inquireDataWithDict:(NSDictionary *)dict tableName:(NSString *)tableName;

/** 通过表名与条件查询数据 */
-(NSArray *)getDataWithTableName:(NSString *)tableName condition:(NSString *)condition conditionBack:(NSString *)conditionBack order:(NSString *)order;

/** 通过表名删除所有数据 */
-(BOOL)deleteAllForTableName:(NSString *)tableName;
/** 通过条件表名批量删除数据 */
-(BOOL)deleteDataForCondition:(NSString *)condition tableName:(NSString *)tableName;

/** 执行sql语句返回数据(数据为字典) */
-(NSArray *)carryOutsql:(NSString *)sql tableName:(NSString *)tableName;

/** 执行sql语句返回数据(数据为字符串) */
-(NSArray *)carryForOutsql:(NSString *)sql tableName:(NSString *)tableName;

/** 判断表中是否有这个字段,没有就添加 */
-(BOOL)isExistDataByArray:(NSArray *)array tableName:(NSString *)tableName;

@end
