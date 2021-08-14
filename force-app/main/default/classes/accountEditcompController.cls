public class accountEditcompController {
   
    @AuraEnabled
    public static PageLayoutWrapper getLayoutMetaData (Id recId) {
        System.debug('Recid is'+recId);
        //getLayoutMetaData(recId,'Account');       
    String reRectTypeId=(String)[SELECT RecordTypeId from Account where id = :recId limit 1 ].RecordTypeId;
    System.debug('reRectTypeId'+reRectTypeId);  
    return GetLayoutName(reRectTypeId); 
    
    }

    @AuraEnabled
    public static PageLayoutWrapper  GetLayoutName (Id recordTypeId) {
         System.debug('recTypeId is '+recordTypeId);
        String body;
        body = toolingAPISOQL('select Layout.FullName from ProfileLayout where RecordTypeId = \'' + recordTypeId + '\' limit 1');
        System.debug('Body'+body);
        String name = body.substringBetween('"FullName":"', '"');
        System.debug('name is '+name);
        List<Metadata.Metadata> layouts = Metadata.Operations.retrieve(Metadata.MetadataType.Layout, new List<String> {name});
        system.debug('layouts*****'+layouts);
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Map<String, Schema.SObjectField> fieldMap = schemaMap.get('Account').getDescribe().fields.getMap();
        Metadata.Layout layoutMd = (Metadata.Layout)layouts.get(0);
        PageLayoutWrapper objWrapper = new PageLayoutWrapper();
        objwrapper.recordTypeId=recordTypeId;

        PageLayoutWrapper.FieldWrapperClass objFieldWrap = new PageLayoutWrapper.FieldWrapperClass();

        for (Metadata.LayoutSection section : layoutMd.layoutSections) {
            if (section.layoutColumns != Null && section.editHeading && section.label != 'System Information' && section.label != 'Custom Links') {
                PageLayoutWrapper.SectionClass objSec = new PageLayoutWrapper.SectionClass();
                objSec.strHeader = section.label;
                Integer colIndex = 0;
                for (Metadata.LayoutColumn column : section.layoutColumns) {
                    if (column.layoutItems != null) {
                        for (Metadata.LayoutItem item : column.layoutItems) {
                            PageLayoutWrapper.ColumnWrapperClass  objColWrap;
                            String strField = item.field;
                            if ( fieldMap.containsKey(strField) && String.valueOf(item.behavior) != 'Readonly' &&  (fieldMap.get(strField).getDescribe().isCreateable() || fieldMap.get(strField).getDescribe().isNameField()) ) {
                                objColWrap = new PageLayoutWrapper.ColumnWrapperClass();
                                if (strField == 'RecordTypeId') {
                                    objColWrap.blnReadOnly = true;
                                }
                                if (String.valueOf(item.behavior) == 'Required') {
                                    if (fieldMap.containsKey(strField) && (!fieldMap.get(strField).getDescribe().isNillable())) {
                                        objColWrap.blnObjectRequired = true;
                                    }
                                    objColWrap.blnRequired = true;
                                }
                                objColWrap.APIName = strField;
                                if (objColWrap != null) {
                                    if (colIndex == 0) {
                                        objSec.lstColumn1.add(objColWrap);
                                    } else {
                                        objSec.lstColumn2.add(objColWrap);
                                    }
                                }


                        }


                    }
                }
                    colIndex++;


                }
                objFieldWrap.lstSection.add(objSec);
            }
        }
        objWrapper.fieldWrap = objFieldWrap;
        return objWrapper;

    }

    @TestVisible static String toolingAPISOQL( String query) {
        return restGet('callout:Internal_salesforce/services/data/v41.0/tooling/query?q='+ (query.replace(' ', '+'))
        ,
        'GET');
    } 

    @TestVisible static String restGet(String endPoint, String method) {
        Http h = new Http();
        HttpRequest hr = new HttpRequest();
        hr.setTimeout(60000);
        hr.setEndpoint(endPoint);
        hr.setMethod(method);
       
        HttpResponse r = h.send(hr);
        return r.getBody();
    }


    @AuraEnabled
    public static void getvalidate(String recId, Account fields){

        System.debug('we are in validate');
        System.debug(fields);

    }



}