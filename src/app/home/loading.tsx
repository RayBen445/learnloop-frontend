import LoadingState from '../../components/LoadingState';

export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <LoadingState size="lg" />
    </div>
  );
}
