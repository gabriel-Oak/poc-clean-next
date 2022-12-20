import { RenderResult } from "@testing-library/react";

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

export function getContextState<ContextProps>(context: RenderResult): ContextProps {
  if (!context.container.querySelector('#context-tester')?.innerHTML)
    throw new Error("Context is empty");
    
  return JSON.parse(context
      .container
      .querySelector('#context-tester')!
      .innerHTML);
}