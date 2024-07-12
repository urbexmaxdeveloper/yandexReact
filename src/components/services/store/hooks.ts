import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { RootState, DispatchHook } from "./store";

export const useDispatchHook = () => useDispatch<DispatchHook>();
export const useSelectorHook: TypedUseSelectorHook<RootState> = useSelector;
