import axios from "axios";

// content

export const addContent = ({ user_no, title, context }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/add/content",
    {
      user_no,
      title,
      context
    }
  );
};

export const modifyContent = ({ title, context, content_no }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/modify/content",
    {
      title,
      context,
      content_no
    }
  );
};

export const deleteContent = ({ content_no }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/delete/content",
    {
      content_no
    }
  );
};

export const findContent = ({ content_no }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/content",
    {
      params: { content_no }
    }
  );
};

export const findContentList = () => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/content_list"
  );
};

// comment

export const addComment = ({ user_no, content_no, context }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/add/comment",
    {
      user_no,
      content_no,
      context
    }
  );
};

export const findComment = ({ content_no }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/comment",
    {
      params: { content_no }
    }
  );
};

export const modifyComment = ({ context, comment_no }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/modify/comment",
    {
      context,
      comment_no
    }
  );
};

export const deleteComment = ({ comment_no }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/delete/comment",
    {
      comment_no
    }
  );
};

// locationcomment

export const addLocationComment = ({ user_no, loca_no, context }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/add/locationcomment",
    {
      user_no,
      loca_no,
      context
    }
  );
};

export const findLocationComment = ({ loca_no }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/locationcomment",
    {
      params: { loca_no }
    }
  );
};

export const findLocationCommentList = () => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/locationcomment_list"
  );
};

export const modifyLocationComment = ({ context, comment_no }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/modify/locationcomment",
    {
      context,
      comment_no
    }
  );
};

export const deleteLocationComment = ({ comment_no }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/delete/locationcomment",
    {
      comment_no
    }
  );
};

// subcomment

export const addSubComment = ({ user_no, comment_no, context }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/add/sub_comment",
    {
      user_no,
      comment_no,
      context
    }
  );
};

export const findSubComment = ({ comment_no }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/sub_comment",
    {
      params: { comment_no }
    }
  );
};

export const deleteSubComment = ({ subcomment_no }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/delete/subcomment",
    {
      subcomment_no
    }
  );
};

// location

export const findLocation = ({ loca_no }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/location",
    {
      params: { loca_no }
    }
  );
};

export const findLocationList = () => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/location_list"
  );
};

// locationdetail
export const findLocationDetail = ({ detail_no }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/locationdetail",
    {
      params: { detail_no }
    }
  );
};

export const findLocationDetailList = () => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/locationdetail_list"
  );
};

// hash
export const findHash = ({ hash_no }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/hash",
    {
      params: { hash_no }
    }
  );
};
// 지역별 해시태그
export const findHashList = () => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/hash_list"
  );
};

// 놀거리별 해시태그
export const findHashList2 = () => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/hash_list2"
  );
};

// search && location함수
export const findHashList3 = () => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/hash_list3"
  );
};

export const findHashNo = ({ hash_name }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/hashno",
    {
      params: { hash_name }
    }
  );
};

export const findHashName = ({ loca_no }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/hashname",
    {
      params: { loca_no }
    }
  );
};

// select hashname
export const selectHashName = ({ hash_name }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/select/hashname",
    {
      params: { hash_name }
    }
  );
};

// 인기게시물
export const popularList = () => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/popular_list"
  );
};

// map data
export const findMap = ({ title }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/map",
    {
      params: { title }
    }
  );
};

// get-user-name
export const getusername = ({ token }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/username",
    {
      params: { token }
    }
  );
};

// updateheart
export const updateheart = ({ user, title }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/updateheart",
    {
      user,
      title
    }
  );
};

// deleteheart
export const deleteheart = ({ user, title }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/deleteheart",
    {
      user,
      title
    }
  );
};

// selectheart
export const selectheart = ({ user }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/selectheart",
    {
      params: { user }
    }
  );
};

// getallheart
export const getallheart = () => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/getallheart"
  );
};

// 마이페이지 고객센터
export const getBoard = ({ user_id }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/getboard",
    {
      params: { user_id }
    }
  );
};

// 마이페이지 좋아요
export const getLike = ({ user_id }) => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/getlike",
    {
      params: { user_id }
    }
  );
};

// 회원탈퇴
export const dropUser = ({ user_id }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/dropuser",
    {
      user_id
    }
  );
};

export const dropUserToken = ({ user_id }) => {
  return axios.post(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/dropusertoken",
    {
      user_id
    }
  );
};

// 랜덤 게시물
export const getRandom = () => {
  return axios.get(
    "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/getrandom"
  );
};
