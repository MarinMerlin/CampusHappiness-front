import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './index.js';
import moment from 'moment';

const initialState = {
    auth: {
        pseudo: '',
        password: '',
        isConnected: false,
        booleanShowPassword: false,
        onPage: 3
    },
    userMain: {
        toggleDrawer: false,
        selectedPage: 0,
        redirectToLogin: false,
        connectedUser: null,
    },
    account: {
        connectedUser: null,
    },
    userStat : {
        monthSatisfaction: null,
        statShown: 0,
        thematiqueList: null,
    },
    generalStat: {
        totalSent: 0,
        totalAnswered: 0,
        totalRate: 0,
        totalWeek: 0,
        monthSent: [],
        monthAnswered: [],
        todayRate: 0,
        todaySatis: 0,
        monthSatis: [],
        weekRate: [],
        loadedSondage: false,
        loadedGroup: false,
        data: [],
    },
    specificSurvey: {
        startDate: moment(),
        loaded: false,
        comments: [],
        thematiqueList: [],
        loaded2: false,
    },
    manageSurvey: {
        sondageList: [],
        groupList: [],
        currentSondage: null,
        currentGroup: null,
        loaded: false,
        selectedSondage: {},
        selectedGroup: {},
        keywordList: null,
    },
    userSurvey: {
        loaded: false,
        alreadyAnswered: false,
        sondageName: "",
        thematiqueList: [],
        answers: null,
        comments: null,
        error: false,
        errorMessage: "Pas d'erreur",
        token: null,
        firstName: null,
        lastName: null,
        remplissage_id: null,
        sondage_id: null,
        user_id: null,
        mailIntensity: null,
        mailIntensityLoaded: false,
        mailIntensityError: null,
    },
    manageUser: {
        success: null,
        userArray: null
    }
};

const middeleware = [thunk]

const store = createStore(
    rootReducer, 
    initialState,
    compose(
        applyMiddleware(...middeleware),
        window.devToolsExtension  && window.devToolsExtension()
    )
);

export { store, initialState };