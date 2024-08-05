import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isAuthenticated } from "@/lib/authenticate";
import { useAtom } from "jotai"
import { favoritesAtom, searchHistoryAtom } from "@/store";
import { getFavorites, getHistory } from "@/lib/userData";


export default function RouteGuard(props) {
    const router = useRouter();
    const [favoritesList, setFavoritesList] = useAtom(favoritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [authorized, setAuthorized] = useState(false);

    const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

    async function updateAtoms() {
        setFavoritesList(await getFavorites());
        setSearchHistory(await getHistory());
    }

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
          setAuthorized(false);
          router.push('/login');
        } else {
          setAuthorized(true);
        }
    }


    useEffect(() => {
        // on initial load - run auth check
        updateAtoms();
        authCheck(router.pathname);
    
        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);
    
        // unsubscribe from events in useEffect return function
        return () => {
          router.events.off('routeChangeComplete', authCheck);
        };
      }, []);
    

      return <>{authorized && props.children}</>
}