import { ComplaintAgainst } from 'src/enums/complaintAgainst';
import { ComplaintOffice } from 'src/enums/complaintOffice';
import { ComplaintStatus } from 'src/enums/complaintStatus';
import { ComplaintType } from 'src/enums/complaintType';

const ComplaintTypeEnumMapping = {
    general: ComplaintType.GENERAL,
    childrelated: ComplaintType.CHILDRELATED,
}

const ComplaintStatusEnumMapping = {
    unread: ComplaintStatus.UNREAD,
    readandunresolved: ComplaintStatus.READANDUNRESOLVED,
    resolved: ComplaintStatus.RESOLVED,
}

const ComplaintOfficeEnumMapping = {
    karachicentral: ComplaintOffice.KARACHICENTRAL,
    karachieast: ComplaintOffice.KARACHIEAST,
    karachisouth: ComplaintOffice.KARACHISOUTH,
    thatta: ComplaintOffice.THATTA,
    sukkur: ComplaintOffice.SUKKUR,
    hyderabad: ComplaintOffice.HYDERABAD,
    badin: ComplaintOffice.BADIN,
    naushahroferoze: ComplaintOffice.NAUSHAHROFEROZE,
    larkana: ComplaintOffice.LARKANA,
    mirpurkhas: ComplaintOffice.MIRPURKHAS,
    mithi: ComplaintOffice.MITHI,
    jacobabad: ComplaintOffice.JACOBABAD,
    dadu: ComplaintOffice.DADU,
    nawabshah: ComplaintOffice.NAWABSHAH,
    khairpur: ComplaintOffice.KHAIRPUR,
    ghotki: ComplaintOffice.GHOTKI,
}

const ComplaintAgainstEnumMapping = {
    accountantgeneralsindh: ComplaintAgainst.ACCOUNTANTGENERALSINDH,
    agriculturesupplyandpricesdepartment: ComplaintAgainst.AGRICULTURESUPPLYANDPRICESDEPARTMENT,
    auqafreligiousaffairszakatandushrdepartment: ComplaintAgainst.AUQAFRELIGIOUSAFFAIRSZAKATANDUSHRDEPARTMENT,
    benazirbhuttoshaheedhumanresourceresearchanddevelopmentboard: ComplaintAgainst.BENAZIRBHUTTOSHAHEEDHUMANRESOURCERESEARCHANDDEVELOPMENTBOARD,
    cooperationdepartment: ComplaintAgainst.COOPERATIONDEPARTMENT,
    culturetourismandantiquitiesdepartment: ComplaintAgainst.CULTURETOURISMANDANTIQUITIESDEPARTMENT,
    educationandliteracydepartment_collegeseducation: ComplaintAgainst.EDUCATIONANDLITERACYDEPARTMENT_COLLEGESEDUCATION,
    educationandliteracydepartment_schooleducation: ComplaintAgainst.EDUCATIONANDLITERACYDEPARTMENT_SCHOOLSEDUCATION,
    energydepartment: ComplaintAgainst.ENERGYDEPARTMENT,
    enquiriesandanticorruptionestablishment: ComplaintAgainst.ENQUIRIESANDANTICORRUPTIONESTABLISHMENT,
    environmentclimatechangeandcostaldevelopmentdepartment: ComplaintAgainst.ENVIRONMENTCLIMATECHANGEANDCOSTALDEVELOPMENTDEPARTMENT,
    environmentalalternateenergy: ComplaintAgainst.ENVIRONMENTALALTERNATEENERGY,
    excisetaxationandnarcoticsdepartment: ComplaintAgainst.EXCISETAXATIONANDNARCOTICSDEPARTMENT,
    financedepartment: ComplaintAgainst.FINANCEDEPARTMENT,
    forestandwildlifedepartment: ComplaintAgainst.FORESTANDWILDLIFEDEPARTMENT,
    fooddepartment: ComplaintAgainst.FOODDEPARTMENT,
    healthdepartment: ComplaintAgainst.HEALTHDEPARTMENT,
    homedepartment: ComplaintAgainst.HOMEDEPARTMENT,
    humanrightsdepartment: ComplaintAgainst.HUMANRIGHTSDEPARTMENT,
    industriesandcommercedepartment: ComplaintAgainst.INDUSTRIESANDCOMMERCEDEPARTMENT,
    informationandarchivesdepartment: ComplaintAgainst.INFORMATIONANDARCHIVESDEPARTMENT,
    informationscienceandtechnologydepartment: ComplaintAgainst.INFORMATIONSCIENCEANDTECHNOLOGYDEPARTMENT,
    irrigationdepartment: ComplaintAgainst.IRRIGATIONDEPARTMENT,
    karachimunicipalcorporation: ComplaintAgainst.KARACHIMUNICIPALCORPORATION,
    karachidevelopmentauthority: ComplaintAgainst.KARACHIDEVELOPMENTAUTHORITY,
    karachiwaterandsewerageboard: ComplaintAgainst.KARACHIWATERANDSEWERAGEBOARD,
    katchiabadiesandspatialdevelopment: ComplaintAgainst.KATCHIABADIESANDSPATIALDEVELOPMENT,
    labourandhumanresourcesdepartment: ComplaintAgainst.LABOURANDHUMANRESOURCESDEPARTMENT,
    lawandparliamentaryaffairsdepartment: ComplaintAgainst.LAWANDPARLIAMENTARYAFFAIRSDEPARTMENT,
    livestockandfisheriesdepartment: ComplaintAgainst.LIVESTOCKANDFISHERIESDEPARTMENT,
    localgovernmentandhousingtownplanningdepartment: ComplaintAgainst.LOCALGOVERNMENTANDHOUSINGTOWNPLANNINGDEPARTMENT,
    lyaridevelopmentauthority: ComplaintAgainst.LYARIDEVELOPMENTAUTHORITY,
    malidevelopmentauthority: ComplaintAgainst.MALIDEVELOPMENTAUTHORITY,
    minesandmineraldevelopmentdepartment: ComplaintAgainst.MINESANDMINERALDEVELOPMENTDEPARTMENT,
    minoritiesaffairsdepartment: ComplaintAgainst.MINORITIESAFFAIRSDEPARTMENT,
    planninganddevelopmentdepartment: ComplaintAgainst.PLANNINGANDDEVELOPMENTDEPARTMENT,
    policedepartment: ComplaintAgainst.POLICEDEPARTMENT,
    populationandwelfaredepartment: ComplaintAgainst.POPULATIONANDWELFAREDEPARTMENT,
    powerdepartment: ComplaintAgainst.POWERDEPARTMENT,
    publichealthengineeringandruraldevelopmentdepartment: ComplaintAgainst.PUBLICHEALTHENGINEERINGANDRURALDEVELOPMENTDEPARTMENT,
    revenuedepartment: ComplaintAgainst.REVENUEDEPARTMENT,
    servicesgeneraladministrationandcoordinationdepartment: ComplaintAgainst.SERVICESGENERALADMINISTRATIONANDCOORDINATIONDEPARTMENT,
    sindhbuildingcontrolauthority: ComplaintAgainst.SINDHBUILDINGCONTROLAUTHORITY,
    sindhemployessocialsecurityinstitution: ComplaintAgainst.SINDHEMPLOYESSOCIALSECURITYINSTITUTION,
    sindhhighereducationcommissionkarachi: ComplaintAgainst.SINDHHIGHEREDUCATIONCOMMISSIONKARACHI,
    sindhpublicservicecommission: ComplaintAgainst.SINDHPUBLICSERVICECOMMISSION,
    socialwelfaredepartment: ComplaintAgainst.SOCIALWELFAREDEPARTMENT,
    specialeducationdepartment: ComplaintAgainst.SPECIALEDUCATIONDEPARTMENT,
    sportandyouthaffairsdepartment: ComplaintAgainst.SPORTANDYOUTHAFFAIRSDEPARTMENT,
    transportandmasstransitdepartment: ComplaintAgainst.TRANSPORTANDMASSTRANSITDEPARTMENT,
    womendevelopmentdepartment: ComplaintAgainst.WOMENDEVELOPMENTDEPARTMENT,
    workandservicesdepartment: ComplaintAgainst.WORKANDSERVICESDEPARTMENT,
};

export default { ComplaintTypeEnumMapping, ComplaintStatusEnumMapping, ComplaintOfficeEnumMapping, ComplaintAgainstEnumMapping};
