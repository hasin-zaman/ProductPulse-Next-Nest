import { ComplaintAgainst } from 'src/enums/complaint-against';
import { ComplaintOffice } from 'src/enums/complaint-office';
import { ComplaintState } from 'src/enums/complaint-state';
import { ComplaintStatus } from 'src/enums/complaint-status';
import { ComplaintType } from 'src/enums/complaint-type';

const ComplaintTypeEnumMapping = {
    general: ComplaintType.GENERAL,
    child_related: ComplaintType.CHILD_RELATED,
}

const ComplaintStatusEnumMapping = {
    unread: ComplaintStatus.UNREAD,
    in_process: ComplaintStatus.IN_PROCESS,
    resolved: ComplaintStatus.RESOLVED,
}

const ComplaintStateEnumMapping = {
    new: ComplaintState.NEW,
    pending: ComplaintState.PENDING,
    critical: ComplaintState.CRITICAL
}

const ComplaintOfficeEnumMapping = {
    karachi_central: ComplaintOffice.KARACHI_CENTRAL,
    karachi_east: ComplaintOffice.KARACHI_EAST,
    karachi_south: ComplaintOffice.KARACHI_SOUTH,
    thatta: ComplaintOffice.THATTA,
    sukkur: ComplaintOffice.SUKKUR,
    hyderabad: ComplaintOffice.HYDERABAD,
    badin: ComplaintOffice.BADIN,
    naushahro_feroze: ComplaintOffice.NAUSHAHRO_FEROZE,
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
    accountant_general_sindh: ComplaintAgainst.ACCOUNTANT_GENERAL_SINDH,
    agriculture_supply_and_prices_department: ComplaintAgainst.AGRICULTURE_SUPPLY_AND_PRICES_DEPARTMENT,
    auqaf_religious_affairs_zakat_and_ushr_department: ComplaintAgainst.AUQAF_RELIGIOUS_AFFAIRS_ZAKAT_AND_USHR_DEPARTMENT,
    benazir_bhutto_shaheed_human_resource_research_and_development_board: ComplaintAgainst.BENAZIR_BHUTTO_SHAHEED_HUMAN_RESOURCE_RESEARCH_AND_DEVELOPMENT_BOARD,
    cooperation_department: ComplaintAgainst.COOPERATION_DEPARTMENT,
    culture_tourism_and_antiquities_department: ComplaintAgainst.CULTURE_TOURISM_AND_ANTIQUITIES_DEPARTMENT,
    education_and_literacy_department_colleges_education: ComplaintAgainst.EDUCATION_AND_LITERACY_DEPARTMENT_COLLEGES_EDUCATION,
    education_and_literacy_department_schools_education: ComplaintAgainst.EDUCATION_AND_LITERACY_DEPARTMENT_SCHOOLS_EDUCATION,
    energy_department: ComplaintAgainst.ENERGY_DEPARTMENT,
    enquiries_and_anti_corruption_establishment: ComplaintAgainst.ENQUIRIES_AND_ANTI_CORRUPTION_ESTABLISHMENT,
    environment_climate_change_and_costal_development_department: ComplaintAgainst.ENVIRONMENT_CLIMATE_CHANGE_AND_COSTAL_DEVELOPMENT_DEPARTMENT,
    environmental_alternate_energy: ComplaintAgainst.ENVIRONMENTAL_ALTERNATE_ENERGY,
    excise_taxation_and_narcotics_department: ComplaintAgainst.EXCISE_TAXATION_AND_NARCOTICS_DEPARTMENT,
    finance_department: ComplaintAgainst.FINANCE_DEPARTMENT,
    forest_and_wildlife_department: ComplaintAgainst.FOREST_AND_WILDLIFE_DEPARTMENT,
    food_department: ComplaintAgainst.FOOD_DEPARTMENT,
    health_department: ComplaintAgainst.HEALTH_DEPARTMENT,
    home_department: ComplaintAgainst.HOME_DEPARTMENT,
    human_rights_department: ComplaintAgainst.HUMAN_RIGHTS_DEPARTMENT,
    industries_and_commerce_department: ComplaintAgainst.INDUSTRIES_AND_COMMERCE_DEPARTMENT,
    information_and_archives_department: ComplaintAgainst.INFORMATION_AND_ARCHIVES_DEPARTMENT,
    information_science_and_technology_department: ComplaintAgainst.INFORMATION_SCIENCE_AND_TECHNOLOGY_DEPARTMENT,
    irrigation_department: ComplaintAgainst.IRRIGATION_DEPARTMENT,
    karachi_municipal_corporation: ComplaintAgainst.KARACHI_MUNICIPAL_CORPORATION,
    karachi_development_authority: ComplaintAgainst.KARACHI_DEVELOPMENT_AUTHORITY,
    karachi_water_and_sewerage_board: ComplaintAgainst.KARACHI_WATER_AND_SEWERAGE_BOARD,
    katchi_abadies_and_spatial_development: ComplaintAgainst.KATCHI_ABADIES_AND_SPATIAL_DEVELOPMENT,
    labour_and_human_resources_department: ComplaintAgainst.LABOUR_AND_HUMAN_RESOURCES_DEPARTMENT,
    law_and_parliamentary_affairs_department: ComplaintAgainst.LAW_AND_PARLIAMENTARY_AFFAIRS_DEPARTMENT,
    livestock_and_fisheries_department: ComplaintAgainst.LIVESTOCK_AND_FISHERIES_DEPARTMENT,
    local_government_and_housing_town_planning_department: ComplaintAgainst.LOCAL_GOVERNMENT_AND_HOUSING_TOWN_PLANNING_DEPARTMENT,
    lyari_development_authority: ComplaintAgainst.LYARI_DEVELOPMENT_AUTHORITY,
    mali_development_authority: ComplaintAgainst.MALI_DEVELOPMENT_AUTHORITY,
    mines_and_mineral_development_department: ComplaintAgainst.MINES_AND_MINERAL_DEVELOPMENT_DEPARTMENT,
    minorities_affairs_department: ComplaintAgainst.MINORITIES_AFFAIRS_DEPARTMENT,
    planning_and_development_department: ComplaintAgainst.PLANNING_AND_DEVELOPMENT_DEPARTMENT,
    police_department: ComplaintAgainst.POLICE_DEPARTMENT,
    population_and_welfare_department: ComplaintAgainst.POPULATION_AND_WELFARE_DEPARTMENT,
    power_department: ComplaintAgainst.POWER_DEPARTMENT,
    public_health_engineering_and_rural_development_department: ComplaintAgainst.PUBLIC_HEALTH_ENGINEERING_AND_RURAL_DEVELOPMENT_DEPARTMENT,
    revenue_department: ComplaintAgainst.REVENUE_DEPARTMENT,
    services_general_administration_and_coordination_department: ComplaintAgainst.SERVICES_GENERAL_ADMINISTRATION_AND_COORDINATION_DEPARTMENT,
    sindh_building_control_authority: ComplaintAgainst.SINDH_BUILDING_CONTROL_AUTHORITY,
    sindh_employee_social_security_institution: ComplaintAgainst.SINDH_EMPLOYEE_SOCIAL_SECURITY_INSTITUTION,
    sindh_higher_education_commission_karachi: ComplaintAgainst.SINDH_HIGHER_EDUCATION_COMMISSION_KARACHI,
    sindh_public_service_commission: ComplaintAgainst.SINDH_PUBLIC_SERVICE_COMMISSION,
    social_welfare_department: ComplaintAgainst.SOCIAL_WELFARE_DEPARTMENT,
    special_education_department: ComplaintAgainst.SPECIAL_EDUCATION_DEPARTMENT,
    sport_and_youth_affairs_department: ComplaintAgainst.SPORT_AND_YOUTH_AFFAIRS_DEPARTMENT,
    transport_and_mass_transit_department: ComplaintAgainst.TRANSPORT_AND_MASS_TRANSIT_DEPARTMENT,
    women_development_department: ComplaintAgainst.WOMEN_DEVELOPMENT_DEPARTMENT,
    work_and_services_department: ComplaintAgainst.WORK_AND_SERVICES_DEPARTMENT,
};  

export default { ComplaintTypeEnumMapping, ComplaintStatusEnumMapping, ComplaintStateEnumMapping, ComplaintOfficeEnumMapping, ComplaintAgainstEnumMapping};
