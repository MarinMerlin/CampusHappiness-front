
import { 
    TOGGLE_DRAWER_ACTION,
    SWITCH_PAGE_ACTION,
} from "./userTypes";

export function toggleDrawer(open) {
    return {
        type: TOGGLE_DRAWER_ACTION,
        payload: {
            toggleDrawer: open
        }
    }
}


const switchPage = (page, next = () => {}) => (dispatch) => {
    dispatch({
        type: SWITCH_PAGE_ACTION,
        payload: {
            page: page
        }
    });
    next();
}

export { switchPage };

