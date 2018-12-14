//
//  DBHelper.m
//  RNPorn
//
//  Created by Nemo on 2018/12/12.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "DBHelper.h"
#import "FMDB.h"
#import "RootDataBaseManager.h"

__strong static id _sharedObject;

@interface DBHelper ()
@property (nonatomic ,strong) FMDatabaseQueue *queue;
@property (nonatomic ,strong) FMDatabase *dataBase;
@property (nonatomic, strong) RootDataBaseManager *dBManager;
@end

@implementation DBHelper

-(void)createDBParams:(NSArray *)params table:(NSString *)name
{
  [self.dBManager creatTabelWithKeys:params isId:YES tableName:name];
}

-(id)complySQL:(NSString *)sql tableName:(NSString *)name{
  return [self.dBManager carryOutsql:sql tableName:name];
}

-(BOOL)deleteSingleData:(NSString *)condition tableName:(NSString *)name{
 return [self.dBManager deleteDataForCondition:condition tableName:name];
}
-(void)deleteAllDataTableName:(NSString *)name
{
  [self.dBManager deleteAllForTableName:name];
}

-(NSArray *)getAllDataWithTableName:(NSString *)name
{
  return [self.dBManager getAllDataTableName:name order:@""];
}

-(void)addDataWithParam:(NSDictionary *)param table:(NSString *)name
{
  [self.dBManager insertNewsData:param tableName:name];
}

-(RootDataBaseManager *)dBManager
{
  if (_dBManager == nil) {
    _dBManager = [RootDataBaseManager rootDataBaseManagerForQueue:self.queue];
    _dBManager.dataBase = self.dataBase;
  }
  return _dBManager;
}

-(NSString *)getDataBasePath{
  NSArray * array =  NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSLog(@"数据库路径：%@",[array objectAtIndex:0]);
  NSString * path = [array[0] stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.db",@"DataStore"]];
  
  return path;
}


#pragma mark - sharedInstance

+ (id)allocWithZone:(struct _NSZone *)zone
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _sharedObject = [super allocWithZone:zone];
  });
  return _sharedObject;
}

+ (instancetype)sharedInstance
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _sharedObject = [[self alloc] init];
  });
  return _sharedObject;
}

- (id)copyWithZone:(NSZone *)zone
{
  return _sharedObject;
}

-(id) init
{
  if(self = [super init]){
    NSString *dbFilePath = [self getDataBasePath];
    _queue = [FMDatabaseQueue databaseQueueWithPath:dbFilePath];
    _dataBase = [[FMDatabase alloc] initWithPath:dbFilePath];
  }
  
  return self;
}

#pragma mark - close

- (void)close {
  FMDBRetain(self);
  dispatch_sync(dispatch_queue_create("DatabaseClose", NULL), ^() {
    [_dataBase close];
    FMDBRelease(_db);
    _dataBase = 0x00;
  });
  FMDBRelease(self);
}

@end
