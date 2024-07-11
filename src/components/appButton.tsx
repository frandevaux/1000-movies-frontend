import { Button } from "@nextui-org/react";

export const AppButton = ({
  onPress,
  children,
  width,
}: {
  onPress: () => void;
  children: string;
  width?: string;
}) => {
  return (
    <Button
      variant="flat"
      radius="full"
      className={` ${width} bg-neutral-900  text-lg whitespace-normal py-3 h-auto `}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};
