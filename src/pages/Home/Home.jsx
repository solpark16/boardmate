import { getPosts } from '@/api/api.posts';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import img from '@/assets/mainitem.png';
import {
  StDiv,
  StHomeSection,
  StSlideSection,
  StCardsSection,
  StCardsCotainer,
  StCardsAlignBtn,
  StCards,
  StCard,
  StCardImg,
  StTitle,
  StPlace,
  StContent,
  StContentNoImg,
  StPostItem
} from './Home.styled';

export const Home = () => {
  const {
    data: posts,
    isPending,
    isError
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  return (
    <StDiv>
      <StHomeSection>
        <StSlideSection>
          <img src={img} />
        </StSlideSection>
        <StCardsSection>
          <StCardsCotainer>
            <StCardsAlignBtn>▼ 최신순</StCardsAlignBtn>
            {posts && posts.length ? (
              <StCards>
                {posts.map((post) => {
                  return (
                    <Link style={{ textDecoration: 'none' }} key={post.id} to={`/detail/${post.id}`}>
                      <StCard>
                        {post.image_url && <StCardImg src={post.image_url} />}
                        <StTitle>{post.title}</StTitle>
                        <StPlace>{post.address}</StPlace>
                        {post.image_url ? (
                          <StContent>{post.content}</StContent>
                        ) : (
                          <StContentNoImg>{post.content}</StContentNoImg>
                        )}

                        <StPostItem>모집중</StPostItem>
                      </StCard>
                    </Link>
                  );
                })}
              </StCards>
            ) : (
              <StCard>작성된 게시물이 없습니다.</StCard>
            )}
            ;
          </StCardsCotainer>
        </StCardsSection>
      </StHomeSection>
    </StDiv>
  );
};
