//
//  DBManagerModule.m
//  RNPorn
//
//  Created by Nemo on 2018/12/13.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "DBManagerModule.h"
#import "DBHelper.h"

@implementation DBManagerModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createDBTableName:(NSString *)name params:(NSArray *)params) {
  [[DBHelper sharedInstance] createDBParams:params table:name];
}

RCT_EXPORT_METHOD(complyTableName:(NSString *)name SQL:(NSString *)sql res:(RCTResponseSenderBlock)callback) {
  id result = [[DBHelper sharedInstance] complySQL:sql tableName:name];
  callback(@[result]);
}

RCT_EXPORT_METHOD(addData:(NSDictionary *)dict tableName:(NSString *)name){
  [[DBHelper sharedInstance] addDataWithParam:dict table:name];
}

RCT_EXPORT_METHOD(getAllDataTableName:(NSString *)name callBack:(RCTResponseSenderBlock)callback) {
  NSArray *datas = [[DBHelper sharedInstance] getAllDataWithTableName:name];
  callback(@[datas]);
}

RCT_EXPORT_METHOD(deleteSingleDataTableName:(NSString *)tabName condition:(NSString *)condition allBack:(RCTResponseSenderBlock)callback) {
  BOOL b = [[DBHelper sharedInstance] deleteSingleData:condition tableName:tabName];
  callback(@[[NSNumber numberWithBool:b]]);
}

RCT_EXPORT_METHOD(deleteAllDataTableName:(NSString *)tabName) {
  [[DBHelper sharedInstance] deleteAllDataTableName:tabName];
}

@end
