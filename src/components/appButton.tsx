import { Button } from "@nextui-org/react";

export const AppButton = ({
  onPress,
  children,
  className,
  submit,
  dark,
}: {
  onPress: () => void;
  children: React.ReactNode;
  className?: string;
  submit?: boolean;
  dark?: boolean;
}) => {
  return (
    <Button
      variant="flat"
      radius="full"
      type={submit ? "submit" : "button"}
      className={` ${className}  ${
        dark ? "bg-neutral-900 " : "bg-neutral-50 text-neutral-900  "
      }   text-lg whitespace-normal py-3 h-auto font-semibold`}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};
