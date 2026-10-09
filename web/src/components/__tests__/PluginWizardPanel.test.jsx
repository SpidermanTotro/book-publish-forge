import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PluginWizardPanel from "../plugins/PluginWizardPanel";

test("pasted JavaScript is kept as a disabled draft and never executed", () => {
  const onFinish = jest.fn();
  delete window.__unsafePluginExecuted;
  render(<PluginWizardPanel onFinish={onFinish} />);
  fireEvent.change(screen.getByLabelText("Plugin name"), {
    target: { value: "Unsafe demo" }
  });
  const injected = "window.__unsafePluginExecuted = true; function Example() {}";
  fireEvent.change(screen.getByLabelText("Source code (not executed)"), {
    target: { value: injected }
  });
  fireEvent.click(screen.getByText("Save disabled draft"));
  expect(window.__unsafePluginExecuted).toBeUndefined();
  expect(onFinish).toHaveBeenCalledTimes(1);
  expect(onFinish.mock.calls[0][0]).toEqual(expect.objectContaining({
    enabled: false,
    Component: null,
    sourceCode: injected,
    requiresSandbox: true
  }));
  expect(screen.getByRole("status")).toHaveTextContent("not available");
});

test("empty plugin names do not generate a draft", () => {
  const onFinish = jest.fn();
  render(<PluginWizardPanel onFinish={onFinish} />);
  fireEvent.click(screen.getByText("Save disabled draft"));
  expect(onFinish).not.toHaveBeenCalled();
});
