class RouteName{
    // Top Level Page
    static ERROR_PAGE = "/error";
    static INDEX = "/";

    // Main page
    static MAIN_PAGE = "/heartFailureStop";

    // content route
    static ANALYSIS = '/analysis';
    static DATA_OUTPUT = '/dataOutput';
    static ALGORITHM_MANAGEMENT = "/algorithmManagement";
    static ACCOUNT_MANAGEMENT = "/accountManagement";
    static LOG_OUT = "/logout";
    static BLANK = "/blank";

    // Authentic Route
    static AUTHENTIC_PAGE = "/authentic";
    static AUTH_REGISTER = '/register';
    static AUTH_LOGIN = '/login';

    //HTTP Verb
    static GET = "GET";
    static POST = "POST";

    // Group Analysis
    static GROUP_ANALYSIS = '/groupAnalysis';
    static VISIT_LIST = '/visitList';
    static STATISTICS = '/statistics';
    static SAVE_RESULT = '/saveResult';
    static FILTER = '/filter';

    // Individual Analysis Data Route
    static INDIVIDUAL_ANALYSIS = '/individualAnalysis';

    // b means backend
    static B_INDIVIDUAL_ANALYSIS_DATA_ROOT = "/backend/data/individualAnalysis";
    static B_INDIVIDUAL_ANALYSIS_UNIFIED_PATIENT_ID = "/unifiedPatientID";
    static B_INDIVIDUAL_ANALYSIS_BASIC_INFO ="/basicInfo";
    static B_INDIVIDUAL_ANALYSIS_TRAJECTORY ="/trajectory";
    static B_INDIVIDUAL_ANALYSIS_VISIT_DETAILED_INFO ="/visitDetailedInfo";
    static B_INDIVIDUAL_ANALYSIS_VISIT_BRIEF_INFO ="/visitBriefInfo";
    static B_INDIVIDUAL_ANALYSIS_LAB_TEST_LIST ="/labTestNameList";
    static B_INDIVIDUAL_ANALYSIS_LAB_TEST_SINGLE_VISIT_FULL_INFO ="/labTestSingleVisit";
    static B_INDIVIDUAL_ANALYSIS_LAB_TEST_SINGLE_VISIT_ONE_ITEM ="/labTestSingleItemInOneVisit";
    static B_INDIVIDUAL_ANALYSIS_LAB_TEST_ONE_ITEM_FULL_TRACE ="/labTestSingleItemTrace";
    static B_INDIVIDUAL_ANALYSIS_ORDER ="/order";
    static B_INDIVIDUAL_ANALYSIS_VITAL_SIGN ="/vitalSign";
    static B_INDIVIDUAL_ANALYSIS_EXAM ="/exam";

    // run machine learning model
    static B_MACHINE_LEARNING = "/backend/machineLearning";
    static B_SINGLE_VISIT_INVOKE_MACHINE_LEARNING_SERVICE = "/singleVisitInvokeMachineLearningService";

    // Authentic Route
    static B_AUTHENTIC = "/backend/authentic";
    static B_AUTH_SIGNUP = '/signup';
    static B_AUTH_SIGNUP_USER_EXIST_TEST = '/signupUserExistTest';
    static B_AUTH_LOGIN = '/login';

    // Get User Info Route
    static B_USER_INFO_DATA_ROOT = "/backend/data/userInfo";
    static B_USER_INFO = "/userInfo";

    // Algorithm Management
    static CREATE_ALGORITHM = '/createAlgorithm';
    static UPDATE_ALGORITHM = '/updateAlgorithm';

    static B_ALGORITHM_MANAGEMENT = "/backend/algorithmManagement";
    static B_UPLOAD_MODEL_FILE = "/uploadModelFile";
    static B_DOWNLOAD_MODEL_FILE = "/downloadModelFile";
    static B_UPLOAD_MODEL_CONFIG = "/uploadModelConfig";
    static B_DOWNLOAD_MODEL_CONFIG = "/downloadModelConfig";
    static B_UPLOAD_PREPROCESSING_MODULE = "/uploadPreprocessingModule";
    static B_DOWNLOAD_PREPROCESSING_MODULE = "/downloadPreprocessingModule";
    static B_UPLOAD_MODEL_DOCUMENT = "/uploadModelDoc";
    static B_DOWNLOAD_MODEL_DOCUMENT="/downloadModelDoc";
    static B_CREATE_NEW_MODEL= "/createNewModel";
    static B_DELETE_EXIST_MODEL = "/deleteExistModel";
    static B_FETCH_MODEL_LIST = "/fetchModelList";
    static B_UPDATE_PLATFORM='/updatePlatform';
    static B_UPDATE_ACCESS_CONTROL = '/updateAccessControl';
    static B_MODEL_INFO = '/modelInfo';

    static B_STATE_MANAGEMENT = "/backend/stateManagement";
    static B_UPDATE_STATE = "/uploadState";
    static B_DOWNLOAD_STATE = "/downloadState";
}

export default RouteName;