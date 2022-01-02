const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const db = require("./model");
const koaBody = require('koa-body');

const bodyParser = () => {
    return koaBody({multipart: true});
}

const app = new Koa();
const router = new Router();
app.use(cors());

// Router.get('/',async function(ctx,next){
//   ctx.sendFile(path.join(__dirname, '../public', 'index.html'))
//   await next();
// });
// module.exports = Router;
// app.use(require('connect-history-api-fallback')());


// user
const addUser = async ctx => {
    const {user_name} = ctx.request.body;
    const ret = await db.addUser({user_name});
    ctx.body = ret;
}
router.post("/add/user", bodyParser(), addUser);

const findUser = async ctx => {
    const { user_no } = ctx.request.query;
    const ret = await db.findUser({ user_no });
    ctx.body = ret;
  }
  router.get("/find/user", findUser);

// content

const addContent = async ctx => {
    const { user_no, title, context} = ctx.request.body;
    const ret = await db.addContent({ user_no, title, context});
    ctx.body = ret;
  };
  router.post("/add/content", bodyParser(), addContent);
  
const modifyContent = async ctx => {
    const { content_no, title, context } = ctx.request.body;
    const ret = await db.modifyContent({ content_no, title, context });
    ctx.body = ret;
  };
  router.post("/modify/content", bodyParser(), modifyContent);
  
const deleteContent = async ctx => {
    const { content_no } = ctx.request.body;
    const ret = await db.deleteContent({ content_no });
    ctx.body = ret;
  };
  router.post("/delete/content", bodyParser(), deleteContent);
  
const findContent = async ctx => {
    const { content_no } = ctx.request.query;
    const ret = await db.findContent({ content_no });
    ctx.body = ret;
  };
  router.get("/find/content", findContent);
  
const findContentList = async ctx => {
    const ret = await db.findContentList();
    ctx.body = ret;
  };
  router.get("/find/content_list", findContentList);
  
  
  // comment 
  
 const addComment = async ctx => {
    const { user_no, content_no, context } = ctx.request.body;
    const ret = await db.addComment({ user_no, content_no, context });
    ctx.body = ret;
  }
  router.post("/add/comment", bodyParser(), addComment);

  const findComment = async ctx => {
    const { content_no } = ctx.request.query;
    const ret = await db.findComment({ content_no });
    ctx.body = ret;
  }
  router.get("/find/comment", findComment);

  const modifyComment = async ctx => {
    const { context, comment_no } = ctx.request.body;
    const ret = await db.modifyComment({ context, comment_no });
    ctx.body = ret;
  };
  router.post("/modify/comment", bodyParser(), modifyComment);
  
  const deleteComment = async ctx => {
    const { comment_no } = ctx.request.body;
    const ret = await db.deleteComment({ comment_no });
    ctx.body = ret;
  };
  router.post("/delete/comment", bodyParser(), deleteComment);

  // locationcomment

  const addLocationComment = async ctx => {
    const { user_no, loca_no, context } = ctx.request.body;
    const ret = await db.addLocationComment({ user_no, loca_no, context });
    ctx.body = ret;
  }
  router.post("/add/locationcomment", bodyParser(), addLocationComment);

  const findLocationComment = async ctx => {
    const { loca_no } = ctx.request.query;
    const ret = await db.findLocationComment({ loca_no });
    ctx.body = ret;
  }
  router.get("/find/locationcomment", findLocationComment);

  const findLocationCommentList = async ctx => {
    const ret = await db.findLocationCommentList();
    ctx.body = ret;
  };
  router.get("/find/locationcomment_list", findLocationCommentList);

  const modifyLocationComment = async ctx => {
    const { context, comment_no } = ctx.request.body;
    const ret = await db.modifyLocationComment({ context, comment_no });
    ctx.body = ret;
  };
  router.post("/modify/locationcomment", bodyParser(), modifyLocationComment);
  
  const deleteLocationComment = async ctx => {
    const { comment_no } = ctx.request.body;
    const ret = await db.deleteLocationComment({ comment_no });
    ctx.body = ret;
  };
  router.post("/delete/locationcomment", bodyParser(), deleteLocationComment);



  
  // sub comment
  
const addSubComment = async ctx => {
    const { user_no, comment_no, context } = ctx.request.body;
    const ret = await db.addSubComment({ user_no, comment_no, context });
    ctx.body = ret;
  };
  router.post("/add/sub_comment", bodyParser(), addSubComment);
  
const findSubComment = async ctx => {
    const { comment_no } = ctx.request.query;
    const ret = await db.findSubComment({ comment_no });
    ctx.body = ret;
}
  router.get("/find/sub_comment", findSubComment);

  const deleteSubComment = async ctx => {
    const { subcomment_no } = ctx.request.body;
    const ret = await db.deleteSubComment({ subcomment_no });
    ctx.body = ret;
  };
  router.post("/delete/subcomment", bodyParser(), deleteSubComment);
  

  // location 가져와보기
  const findLocation = async ctx => {
    const { loca_no } = ctx.request.query;
    const ret = await db.findLocation({ loca_no });
    ctx.body = ret;
  };
  router.get("/find/location", findLocation);

  const findLocationList = async ctx => {
    const ret = await db.findLocationList();
    ctx.body = ret;
  };
  router.get("/find/location_list", findLocationList);

  // locationdetail 
  const findLocationDetail = async ctx => {
    const { detail_no } = ctx.request.query;
    const ret = await db.findLocationDetail({ detail_no });
    ctx.body = ret;
  };
  router.get("/find/locationdetail", findLocationDetail);

  const findLocationDetailList = async ctx => {
    const ret = await db.findLocationDetailList();
    ctx.body = ret;
  };
  router.get("/find/locationdetail_list", findLocationDetailList);

  // hash
  const findHash = async ctx => {
    const { hash_no } = ctx.request.query;
    const ret = await db.findHash({ hash_no });
    ctx.body = ret;
  };
  router.get("/find/hash", findHash);

  // 지역별 해시태그
  const findHashList = async ctx => {
    const ret = await db.findHashList();
    ctx.body = ret;
  };
  router.get("/find/hash_list", findHashList);

  // 놀거리별 해시태그
  const findHashList2 = async ctx => {
    const ret = await db.findHashList2();
    ctx.body = ret;
  };
  router.get("/find/hash_list2", findHashList2);

  // search && location 함수
  const findHashList3 = async ctx => {
    const ret = await db.findHashList3();
    ctx.body = ret;
  };
  router.get("/find/hash_list3", findHashList3);

  // mainsearch
  const findHashNo = async ctx => {
    const { hash_name } = ctx.request.query;
    const ret = await db.findHashNo({ hash_name });
    ctx.body = ret;
  };
  router.get("/find/hashno", findHashNo);

  // hash name 가져오기
  const findHashName = async ctx => {
    const { loca_no } = ctx.request.query;
    const ret = await db.findHashName({ loca_no });
    ctx.body = ret;
  };
  router.get("/find/hashname", findHashName);


  // hash 테이블 누르면 location select
  const selectHashName = async ctx => {
    const { hash_name } = ctx.request.query;
    const ret = await db.selectHashName({ hash_name });
    ctx.body = ret;
  }
  router.get("/select/hashname", selectHashName);

  // 인기게시물 가져오기
  const popularList = async ctx => {
    const ret = await db.popularList();
    ctx.body = ret;
  };
  router.get("/find/popular_list", popularList);

  // map data
  const findMap = async ctx => {
    const { title } = ctx.request.query;
    const ret = await db.findMap({title});
    ctx.body = ret;
  };
  router.get("/find/map", findMap);

  

  // updateheart
  const updateheart = async ctx => {
    const { user, title } = ctx.request.body;
    const ret = await db.updateheart({ user, title });
    ctx.body = ret;
  };
  router.post("/updateheart", bodyParser(), updateheart);

  // deleteheart
  const deleteheart = async ctx => {
    const { user, title } = ctx.request.body;
    const ret = await db.deleteheart({ user, title });
    ctx.body = ret;
  };
  router.post("/deleteheart", bodyParser(), deleteheart);
  
  // selectheart
  const selectheart = async ctx => {
    const { user } = ctx.request.query;
    const ret = await db.selectheart({user});
    ctx.body = ret;
  };
  router.get("/selectheart", selectheart);

  // getallheart
  const getallheart = async ctx => {
    const ret = await db.getallheart();
    ctx.body = ret;
  };
  router.get("/find/getallheart", getallheart);

  // 마이페이지에 고객센터 자기가 쓴 글 title, content_no 가져오기
  const getBoard = async ctx => {
    const { user_id } = ctx.request.query;
    const ret = await db.getBoard({user_id});
    ctx.body = ret;
  };
  router.get("/getboard", getBoard);

  // 마이페이지에 좋아요 한 글 title, loca_no 가져오기
  const getLike = async ctx => {
    const { user_id } = ctx.request.query;
    const ret = await db.getLike({user_id});
    ctx.body = ret;
  };
  router.get("/getlike", getLike);

  
  // 회원탈퇴
  const dropUser = async ctx => {
    const { user_id } = ctx.request.body;
    const ret = await db.dropUser({ user_id });
    ctx.body = ret;
  };
  router.post("/dropuser", bodyParser(), dropUser);

  const dropUserToken = async ctx => {
    const { user_id } = ctx.request.body;
    const ret = await db.dropUserToken({ user_id });
    ctx.body = ret;
  };
  router.post("/dropusertoken", bodyParser(), dropUserToken);


  const getRandom = async ctx => {
    const ret = await db.getRandom();
    ctx.body = ret;
  };
  router.get("/getrandom", getRandom);


app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000);