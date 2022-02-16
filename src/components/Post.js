import React from "react";
import { useState } from "react";
import { Grid, Text, Button, Image } from "../elements"
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux"
import { actionCreators as likeActions } from "../redux/modules/likes";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

import Badge from 'react-bootstrap/Badge'
import { BsColumns, BsHeart, BsHeartFill } from "react-icons/bs";
import { TiHeartOutline, TiHeart } from "react-icons/ti";

const Post = ({post}) => {
  const dispatch = useDispatch();
  const _user = useSelector((state)=>state.user.user)
  // const likers = useSelector((state)=>state.likes.list)
  const isLiking = post.Likers.find(liker => liker.id === _user.id)
 
  
  // const [islike, setlike] = React.useState(isLiking)
  
  React.useEffect(()=>{
    
    console.log(isLiking)

  },[])

  // React.useEffect(()=> {
  //   console.log('isliking',isLiking)
  // },[])


  let likeButton = () => {
      
      dispatch(likeActions.likePostFB(post.id))
  }

  let dislikeButton = () => {
      
      dispatch(likeActions.deleteLikeFB(post.id))
  }

    // localStorage에서 토큰값 여부로 헤더 판별
    // state에서 is_login도 같이 판별 필요
    return (
      <React.Fragment>
        <Postcard>

          <ImageBox>
            {/* 이미지 클릭 시 상세페이지로 이동 */}
            <PostImage
              onClick={()=> {
                history.push(`/detail/${post.id}`)
              }}
              src={`http://14.45.204.153:8023/${post.imageUrl}`}
              ></PostImage>
            {/* 하트 클릭 시 색깔 변경, 데이터 속성 넘겨주기 */}
            {/* 삼항연산자 써서 해야하나? */}

              {/* useSelector로 받아온 liked가 true/false이냐에 따라서 나누면 될 듯 */}
            {!isLiking?
            // 빈하트
            <TiHeartOutline
              onClick={likeButton}
              style={{ position: "absolute", fontSize:"1.7rem", top:"10px", right:"10px", zIndex: "1", color:"white"}} />
              :
               // 채워진
              <TiHeart
              onClick={dislikeButton}
              style={{ position: "absolute", fontSize:"1.7rem", top:"10px", right:"10px", zIndex: "1", color:"red",}} />
             }


          </ImageBox>
          {/* 태그 map*/}


          <div style={{padding:"15px"}}>
          <Text margin="0px" bold>
            {post.title}
          </Text>

          <Tag>
            {/* 서버 tags DB 저장형태에 따라 수정해야 할 수 있음 */}
            {post.tags.map((p, idx) => {
              return (
                <Badge
                  pill
                  bg="dark"
                  key={idx}
                  style={{
                    margin: "7px 2px",
                    padding: "6px 10px",
                    fontSize: "0.8rem",
                    fontFamily: "Pretendard-Thin"
                  }}
                >
                  {p.name}
                </Badge>
              );
            })}
          </Tag>
          </div>
        </Postcard>
      </React.Fragment>
    );
}

Post.defaultProps = {
    title: "존예존예존예존예!",
    tags: ["태그1", "태그2"],
    imageUrl: "https://thumb.mt.co.kr/06/2021/09/2021092406423496252_1.jpg/dims/optimize/",
}

// 포스트 전체크기
const Postcard = styled.div`
    // margin:30px 8px 8px 8px;
    // width: 20%;
    // min-width: 200px;
    // border-radius: 15px;
    // box-shadow: 4px 4px 10px 2px #dadada;
    // background-color: white;
    // height: auto;

    border-radius: 15px;
    margin-bottom:1rem;
    background-color: white;

`


// 하트포함 이미지
const ImageBox = styled.div`
position: relative;

display: inline-flex;
width: 100%;
border-radius: 10px;
overflow: hidden;

    
:hover {
  cursor:pointer;
  box-shadow: rgba(0,0,0,0.2) 0 0 10px 3px;
}


`

// 이미지 크기
const PostImage = styled.img`

    // width: 100%;
    // min-height: 100px;
    // height: auto;
    // border-radius: 15px;

    // :hover {
    //   transition: all 0.3s ease-in;
    // }

    width: 100%;
    height: 100%;
    object-fit: cover;


`

const Tag = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export default Post;