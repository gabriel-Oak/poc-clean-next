import { useEffect } from "react";

export default function createContextTester<ContextProps>(
  useContextHook: () => ContextProps,
  execTest: (useContext: ContextProps) => void,
) {
  return () => {
    execTest(useContextHook());

    return (
      <div id="context-tester">
        {JSON.stringify(useContextHook())}
      </div>
    );
  }
}