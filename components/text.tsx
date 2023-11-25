export function Test() {
  return <Prop isOk/>;
}

function Prop({ isOk }: { isOk?: boolean }) {
  return <>{isOk}</>;
}
