export const generateVariables = (
  prefix: string,
  variables: Record<string, string | number>
) => {
  const varString = Object.entries(variables)
    .map(([key, value]) => `--${prefix}-${key}:${value};`)
    .join("\n");
  return `html{
${varString}
}`;
};
