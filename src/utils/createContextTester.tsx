export default function createContextTester<ContextProps>(
  useContextHook: () => ContextProps,
  execTest: (useContext: ContextProps) => void,
) {
  return () => {
    execTest(useContextHook())
    return <div />;
  }
}