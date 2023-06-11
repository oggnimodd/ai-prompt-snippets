import Skeleton from "./Skeleton";
import { Container } from "../Container";
import { Loading, LoadingWithMessage } from "../Loading";

export const Default = () => {
  return (
    <Container>
      <Skeleton className="h-44" />
    </Container>
  );
};

export const WithLoadingIndicator = () => {
  return (
    <Container>
      <Skeleton className="h-44">
        <Loading />
      </Skeleton>
    </Container>
  );
};

export const WithLoadingMessage = () => {
  return (
    <Container>
      <Skeleton className="h-44">
        <LoadingWithMessage />
      </Skeleton>
    </Container>
  );
};

export const CustomHeight = () => {
  return (
    <Container>
      <Skeleton className="min-h-60">
        <LoadingWithMessage />
      </Skeleton>
    </Container>
  );
};

export const AnimationDuration = () => {
  return (
    <Container>
      <Skeleton animationDuration={3000} className="min-h-60">
        <LoadingWithMessage message="pulse animation will stop after a certain duration" />
      </Skeleton>
    </Container>
  );
};
