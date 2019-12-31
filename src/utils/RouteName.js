class RouteName{
    // Top Level Page
    static ERROR_PAGE = "/error";
    static INDEX = "/";

    // Main page
    static MAIN_PAGE = "/heart-failure-stop";

    // content route
    static ANALYSIS = '/analysis';
    static DATA_OUTPUT = '/data-output';
    static ALGORITHM_MANAGEMENT = "/algorithm-management"
    static ACCOUNT_MANAGEMENT = "/account-management"
    static LOG_OUT = "/log-out"

    // Authentic Route
    static AUTHENTIC_PAGE = "/authentic";
    static AUTH_REGISTER = '/register';
    static AUTH_LOGIN = '/login';

    //HTTP Verb
    static GET = "GET";
    static POST = "POST";

    // Trajectory Analysis Data Route
    // b means backend
    static B_TRAJECTORY_ANALYSIS_DATA_ROOT = "/backend/data/trajectoryAnalysis";
    static B_TRAJECTORY_ANALYSIS_UNIFIED_PATIENT_ID = "/unifiedPatientID";
    static B_TRAJECTORY_ANALYSIS_BASIC_INFO ="/basicInfo";
    static B_TRAJECTORY_ANALYSIS_TRAJECTORY ="/trajectory";
    static B_TRAJECTORY_ANALYSIS_VISIT_DETAILED_INFO ="/visitDetailedInfo";
    static B_TRAJECTORY_ANALYSIS_VISIT_BRIEF_INFO ="/visitBriefInfo";
    static B_TRAJECTORY_ANALYSIS_LAB_TEST_LIST ="/labTestNameList";
    static B_TRAJECTORY_ANALYSIS_LAB_TEST_SINGLE_VISIT_FULL_INFO ="/labTestSingleVisit";
    static B_TRAJECTORY_ANALYSIS_LAB_TEST_SINGLE_VISIT_ONE_ITEM ="/labTestSingleItemInOneVisit";
    static B_TRAJECTORY_ANALYSIS_LAB_TEST_ONE_ITEM_FULL_TRACE ="/labTestSingleItemTrace";
    static B_TRAJECTORY_ANALYSIS_ORDER ="/order";
    static B_TRAJECTORY_ANALYSIS_VITAL_SIGN ="/vitalSign";
    static B_TRAJECTORY_ANALYSIS_EXAM ="/exam";

    // run machine learning model
    static B_MACHINE_LEARNING = "/backend/machineLearning";
    static B_TENSORFLOW_HAWKES_RNN = "/tensorflow/hawkesRNN";

    // Authentic Route
    static B_AUTHENTIC = "/backend/authentic";
    static B_AUTH_SIGNUP = '/signup';
    static B_AUTH_SIGNUP_USER_EXIST_TEST = '/signupUserExistTest';
    static B_AUTH_LOGIN = '/login';

    // Get User Info Route
    static B_USER_INFO_DATA_ROOT = "/backend/data/userInfo";
    static B_USER_INFO = "/userInfo";

    // Algorithm Management
    static B_ALGORITHM_MANAGEMENT = "/backend/algorithmManagement";
    static UPLOAD_MODEL_FILE = "/uploadModelFile";
    static DOWNLOAD_MODEL_FILE = "/downloadModelFile";
    static UPLOAD_MODEL_CONFIG = "/uploadModelConfig";
    static DOWNLOAD_MODEL_CONFIG = "/downloadModelConfig";
    static UPLOAD_PREPROCESSING_MODULE = "/uploadPreprocessingModule";
    static DOWNLOAD_PREPROCESSING_MODULE = "/downloadPreprocessingModule";
    static UPLOAD_MODEL_DOCUMENT = "/uploadModelDoc";
    static DOWNLOAD_MODEL_DOCUMENT="/downloadModelDoc";
    static CREATE_NEW_MODEL= "/createNewModel";
    static DELETE_EXIST_MODEL = "/deleteExistModel";
    static FETCH_MODEL_LIST = "/fetchModelList";
}

export default RouteName;