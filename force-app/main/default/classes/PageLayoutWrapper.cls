public with sharing class PageLayoutWrapper {
    
    @AuraEnabled
    public String recordTypeId {get;set;}
    
    @AuraEnabled
    public String AccountDocName {get;set;}
    
    @AuraEnabled
    public String AccountName {get;set;}
    
    @AuraEnabled
    public List<ColumnWrapperClass> lstColumn {get;set;}
    
    @AuraEnabled
    public List<SectionClass> lstSection {get;set;}
    
    @AuraEnabled
    public FieldWrapperClass fieldWrap {get;set;}
    
   
    
    @AuraEnabled
    public Boolean blnEditAccessError {get;set;}
    
    public class SectionClass {
        @AuraEnabled
        public String strHeader {get; set;}
        @AuraEnabled
        public List<ColumnWrapperClass> lstColumn1 {get;set;}
        @AuraEnabled
        public List<ColumnWrapperClass> lstColumn2 {get;set;}
        
        public SectionClass () {
            this.lstColumn1 = new List<ColumnWrapperClass>();
            this.lstColumn2 = new List<ColumnWrapperClass>();
        }
    }
    
    public class ColumnWrapperClass {
        @AuraEnabled
        public Boolean  blnReadOnly {get; set;}
    
        @AuraEnabled
        public Boolean  blnRequired {get; set;}
        
        @AuraEnabled
        public Boolean  blnObjectRequired {get; set;}
        
        @AuraEnabled
        public string  APIName {get; set;}
        
        public ColumnWrapperClass () {
            this.blnReadOnly = false;
            this.blnRequired = false;
            this.blnObjectRequired = false;
        }
    }
    
    public class FieldWrapperClass {
        @AuraEnabled
        public List<SectionClass> lstSection {get;set;}
        
        public FieldWrapperClass () {
            this.lstSection = new List<SectionClass>();
        }
    }
}