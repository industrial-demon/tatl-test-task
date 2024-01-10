import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  SyntheticEvent,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const Context = createContext<{
  isOpenSnake: boolean;
  closeSnack: () => void;
  openSnack: () => void;
} | null>(null);

export const QuerySnackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpenSnake, setOpenSnake] = useState(false);

  const closeSnack = useCallback(
    (event?: SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenSnake(false);
    },
    []
  );

  const openSnack = useCallback(() => {
    setOpenSnake(true);
  }, []);

  /*
   
   https://github.com/TkDodo/blog-comments/discussions/68#discussioncomment-6562714
   */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (_, query) => {
            if (query.state.status === "error") {
              setOpenSnake(true);
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: () => {
            setOpenSnake(true);
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ isOpenSnake, closeSnack, openSnack }}>
        {children}
      </Context.Provider>
    </QueryClientProvider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuerySnackCtx = () => {
  const ctx = useContext(Context);
  if (ctx === null) {
    throw Error("Must be in scope");
  }
  return ctx;
};
