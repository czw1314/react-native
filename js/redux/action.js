function newCompany(company) {
    return {
    type:'NEW_COMPANY',
    company:company
    }
}
function newMonitor(monitor) {
    return {
        type:'NEW_MONITOR',
        monitorID:monitor
    }
}
function getCompanyList(companyList) {
    return {
        type:'COMPANY_LIST',
        companyList:companyList
    }
}
export {newCompany,getCompanyList,newMonitor}