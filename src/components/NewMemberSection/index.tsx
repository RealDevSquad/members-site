import { useEffect, useRef } from 'react';
import { useGetUserWithLoadMore } from '@/src/services/serverApi';
import NewMemberSectionPresentation from './Presentation';
import { Button, Spinner } from '@chakra-ui/react';
import styles from './newMemberSection.module.css';

export default function NewMemberSection() {
  const { data, isLoading, isFetching, loadMore, links } =
    useGetUserWithLoadMore();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && links?.next) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMore, links]);

  return (
    <div>
      <NewMemberSectionPresentation data={data} isLoading={isLoading} />

      {links?.next && links.next.length && (
        <div
          className={styles.newMemberSectionLoadMore__container}
          ref={loadMoreRef}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}
