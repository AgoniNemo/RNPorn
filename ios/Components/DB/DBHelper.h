//
//  DBHelper.h
//  RNPorn
//
//  Created by Nemo on 2018/12/12.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DBHelper : NSObject

+ (instancetype)sharedInstance;

-(void)addDataWithParam:(NSDictionary *)param table:(NSString *)name;

-(BOOL)addMoreDataWithParam:(NSArray *)param table:(NSString *)name;

-(void)createDBParams:(NSArray *)params table:(NSString *)name;

-(id)complySQL:(NSString *)sql tableName:(NSString *)name;

-(BOOL)deleteSingleData:(NSString *)condition tableName:(NSString *)name;

-(void)deleteAllDataTableName:(NSString *)name;

-(NSArray *)getAllDataWithTableName:(NSString *)name;

-(NSArray *)getSingleDataWithTableName:(NSString *)name key:(NSString *)key value:(NSString *)value;

@end
