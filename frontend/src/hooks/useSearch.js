import { useSelector, useDispatch } from "react-redux";
import { setSearch, setShowSearch, toggleSearch, clearSearch } from '../store/slices/searchSlice';
import { selectSearchQuery, selectShowSearch } from "../store/selectors/searchSelectors";

export const useSearch = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);
    const showSearch = useSelector(selectShowSearch);

    const handleSetSearch = (query) => {
        dispatch(setSearch(query));
    };

    const handleToggleSearch = () => {
        dispatch(toggleSearch());
    };

    const handleSetShowSearch = (show) => {
        dispatch(setShowSearch(show));
    };

    const handleClearSearch = () => {
        dispatch(clearSearch());
    };

    return {
        searchQuery,
        showSearch,
        setSearch: handleSetSearch,
        toggleSearch: handleToggleSearch,
        setShowSearch: handleSetShowSearch,
        clearSearch: handleClearSearch,
    };

}