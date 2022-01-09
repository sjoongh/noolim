# noolim-node

## Node.js는 webpack 대신 koa를 활용
**DB 데이터 전달 순서**
1. root 폴더의 index.js에서 db data를 post && get으로 받음
2. ./model/index.js 에서 쿼리문을 통해 db로 전달
3. db와의 연결은 ./database/index.js를 통해 쿼리문이 전달됨

**package.json**
```
{
  "name": "noolim-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "@koa/cors": "^3.1.0",
    "connect-history-api-fallback": "^1.6.0",
    "dotenv": "^10.0.0",
    "knex": "^0.95.11",
    "koa": "^2.13.3",
    "koa-body": "^4.2.0",
    "koa-generator": "^1.1.17",
    "koa-router": "^10.1.1",
    "mysql": "^2.18.1",
    "nodemon": "^2.0.13"
  },
  "devDependencies": {},
  "scripts": {
    "start": "nodemon --watch src/ src",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

------------------------------------------------------------------------------------------------------------------------------------------

**./src/database/index.js**
- AWS RDS와 연결
- MYSQL ORM 모듈인 Knex를 사용해 mysql쿼리문 nodejs에서 사용
- 
```
require('dotenv').config();

const db = require('knex')({
    client: 'mysql',
    connection: {
      // host : '127.0.0.1',
      // host : 'noolim-project.cdhxtabtekrk.ap-northeast-2.rds.amazonaws.com',
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      port : 3306,
      password : process.env.DB_PASSWORD,
      database : 'board_db',
      timezone: 'KST'
    },
  });

  
  module.exports = db;
```

------------------------------------------------------------------------------------------------------------------------------------------

**index.js**
```
const Koa = require('koa'); 
const Router = require('koa-router'); // router 경로
const cors = require('@koa/cors'); // cors 설정
const db = require("./model"); // ./model폴더의 index.js파일에서 쿼리문 실행됨
const koaBody = require('koa-body'); // bodyParser()사용을 위해 라이브러리를 가져옴

// bodyParser : 미들웨어로서, Node.js의 POST/PUT/PATCH같은 HTTP METHOD들의 Req body에 JSON형식으로 데이터를 넣어 주면, 이를 파싱해서 사용할 수 있도록 한다. --> GET에는 안들어감
const bodyParser = () => {
    return koaBody({multipart: true});
}

const app = new Koa();
const router = new Router(); // router를 통해 post와 get 보내고 가져옴
app.use(cors());

// user
const addUser = async ctx => {
    const {user_name} = ctx.request.body;
    const ret = await db.addUser({user_name});
    ctx.body = ret;
}
// (post신호가 오는 url, JSon형식data, 전달할 함수명)
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
```

------------------------------------------------------------------------------------------------------------------

**./model/index.js**
- DB에서 쿼리문을 통해 데이터를 가져오는 역할
```
const db = require('../database');

const self = {};

// user

self.addUser = async ({ user_name }) => {
    const query = `
      INSERT INTO user
      values (null,?,now())
    `;
    await db.raw(query, [user_name]);
  };
  self.findUser = async ({ user_no }) => {
    const query = `
      SELECT * FROM user
      WHERE user_no = ?
    `;
    const ret = await db.raw(query, [user_no]);
    return ret[0];
  };
  
  // content

  self.addContent = async ({ user_no, title, context }) => {
    const query = `
      INSERT INTO content 
      values (null,?, ?, ?, now())
    `;
    await db.raw(query, [user_no, title, context ]);
  };
  
  self.modifyContent = async ({  title, context, content_no }) => {
    const query = `
      UPDATE content
      SET title = ?, context = ?
      WHERE content_no = ?
    `;
    await db.raw(query, [ title, context, content_no]);
  };
  
  self.deleteContent = async ({ content_no }) => {
    const query = `
      DELETE FROM content
      WHERE content_no = ? 
    `;
    await db.raw(query, [content_no]);
  };
  
  self.findContent = async ({ content_no }) => {
    const query = `
    SELECT 
    content_no,
    U.user_id,
    CT.title,
    CT.context,
    CT.regdate,
    U.username
    FROM content CT
    INNER JOIN user U on U.user_id = CT.user_no
    WHERE CT.content_no = ?
    `;
    const ret = await db.raw(query, [content_no]);
    return ret[0][0];
  };
  
  self.findContentList = async () => {
    const query = `
    SELECT
    content_no,
    U.user_id,
    title,
    context,
    CT.regdate,
    username
    FROM content CT
    INNER JOIN user U ON U.user_id = CT.user_no
    ORDER BY CT.regdate DESC
    `;
    const ret = await db.raw(query );
    return ret[0];
  };
  
  // comment

  self.addComment = async ({ user_no, content_no, context }) => {
    const query = `
      INSERT INTO comment
      values (null,?, ?, ?,now())
    `;
    await db.raw(query, [user_no, content_no, context]);
  };
  
  self.findComment = async ({ content_no }) => {
    const query = `
      SELECT 
      CM.comment_no,
      U.user_id,
      CM.content_no,
      CM.context,
      CM.regdate,
      U.username
      FROM comment CM
      INNER JOIN user U on U.user_id = CM.user_no
      WHERE CM.content_no = ?
    `;
    const ret = await db.raw(query, [content_no]);
    return ret[0];
  };

  self.modifyComment = async ({ context, comment_no }) => {
    const query = `
      UPDATE comment
      SET  context = ?
      WHERE comment_no = ?
    `;
    await db.raw(query, [ context, comment_no]);
  };

  self.deleteComment = async ({ comment_no }) => {
    const query = `
      DELETE FROM comment
      WHERE comment_no = ? 
    `;
    await db.raw(query, [comment_no]);
  };

  // locationcomment

  self.addLocationComment = async ({ user_no, loca_no, context }) => {
    const query = `
      INSERT INTO locationcomment
      values (null,?, ?, ?,now())
    `;
    await db.raw(query, [user_no, loca_no, context]);
  };
  
  self.findLocationComment = async ({ loca_no }) => {
    const query = `
      SELECT 
      LC.comment_no,
      U.user_id,
      LC.loca_no,
      LC.context,
      LC.regdate,
      U.username
      FROM locationcomment LC
      INNER JOIN user U on U.user_id = LC.user_no
      WHERE LC.loca_no = ?
    `;
    const ret = await db.raw(query, [loca_no]);
    return ret[0];
  };

  self.findLocationCommentList = async () => {
    const query = `
    SELECT 
    comment_no,
    U.user_id,
    LC.loca_no,
    LC.context,
    LC.regdate
    FROM locationcomment LC
    INNER JOIN user U ON U.user_id = LC.user_no
    ORDER BY LC.regdate DESC
    `;
    const ret = await db.raw(query );
    return ret[0];
  };

  self.modifyLocationComment = async ({ context, comment_no }) => {
    const query = `
      UPDATE locationcomment
      SET  context = ?
      WHERE comment_no = ?
    `;
    await db.raw(query, [ context, comment_no]);
  };

  self.deleteLocationComment = async ({ comment_no }) => {
    const query = `
      DELETE FROM locationcomment
      WHERE comment_no = ? 
    `;
    await db.raw(query, [comment_no]);
  };
  
  // subcomment

  self.addSubComment = async ({ user_no, comment_no, context }) => {
    const query = `
      INSERT INTO subcomment
      values (null,?, ?, ?,now())
    `;
    await db.raw(query, [user_no, comment_no, context]);
  };
  
  self.findSubComment = async ({ comment_no }) => {
    const query = `
      SELECT * FROM subcomment SCM
      INNER JOIN user U on U.user_no = SCM.user_no
      WHERE comment_no = ?
    `;
    const ret = await db.raw(query, [comment_no]);
    return ret[0];
  };
  
  self.deleteSubComment = async ({ subcomment_no }) => {
    const query = `
      DELETE FROM subcomment
      WHERE subcomment_no = ? 
    `;
    await db.raw(query, [subcomment_no]);
  };
  

  // location 해보기

  self.findLocation = async ({ loca_no }) => {
    const query = `
    SELECT *
    FROM location
    WHERE loca_no = ?
    `;
    const ret = await db.raw(query, [loca_no]);
    return ret[0][0];
  };
  
  self.findLocationList = async () => {
    const query = `
    select l.loca_no,
    l.title,
    l.picture1,
    l.liked,
    GROUP_CONCAT(h.hash_name separator ' ') AS hash_name
    from location l
    inner join connection c
    on l.loca_no = c.loca_no 
    inner join hash h 
    on h.hash_no = c.hash_no
    group by l.loca_no
    `;
    const ret = await db.raw(query );
    return ret[0];
  };


  // locationdetail 
  self.findLocationDetail = async ({ detail_no }) => {
    const query = `
    SELECT *
    FROM locationdetail
    WHERE detail_no = ?
    `;
    const ret = await db.raw(query, [detail_no]);
    return ret[0][0];
  };
  
  self.findLocationDetailList = async () => {
    const query = `
    SELECT *
    FROM locationdetail
    ORDER BY detail_no 
    `;
    const ret = await db.raw(query );
    return ret[0];
  };

  // hash 

  self.findHash = async ({ hash_no }) => {
    const query = `
    SELECT *
    FROM hash
    WHERE hash_no = ?
    `;
    const ret = await db.raw(query, [hash_no]);
    return ret[0][0];
  };
  // 지역별 해시태그
  self.findHashList = async () => {
    const query = `
    SELECT *
    FROM hash
    WHERE hash_no <= 25
    ORDER BY hash_no
    `;
    const ret = await db.raw(query );
    return ret[0];
  };

  // 놀거리 종류별 해시태그
  self.findHashList2 = async () => {
    const query = `
    SELECT *
    FROM hash
    WHERE hash_no > 25
    ORDER BY hash_no
    `;
    const ret = await db.raw(query );
    return ret[0];
  };

  // search && location을 위한 함수
  self.findHashList3 = async () => {
    const query = `
    SELECT *
    FROM hash
    ORDER BY hash_no
    `;
    const ret = await db.raw(query );
    return ret[0];
  };
  
  // main
  self.findHashNo = async ({ hash_name }) => {
    const query = `
    SELECT hash_no,
    hash_name
    FROM hash
    WHERE hash_name = ?
    `;
    const ret = await db.raw(query, [hash_name]);
    return ret[0][0];
  };

  // hash name 가져오기
  self.findHashName = async ({ loca_no }) => {
    const query = `
    SELECT hash_name
    FROM hash
    WHERE hash_no IN (SELECT hash_no FROM connection WHERE loca_no = ?)
    `;
    const ret = await db.raw(query, [loca_no]);
    return ret;
  };

  // select hashname
  self.selectHashName = async ({ hash_name }) => {
    const query = `
    select l.loca_no,
    l.title,
    l.picture1,
    l.liked,
    l.like_color,
    GROUP_CONCAT(h.hash_name separator ' ') AS hash_name
    from location l
    inner join connection c
    on l.loca_no = c.loca_no 
    inner join hash h 
    on h.hash_no = c.hash_no
    group by l.loca_no
    having hash_name LIKE CONCAT('%',?,'%')
    `;
    const ret = await db.raw(query, [hash_name]);
    return ret[0];
  };

  // 인기게시물
  self.popularList = async () => {
    const query = `
    SELECT loca_no, title, picture1
    FROM location
    ORDER BY heart
    `;
    const ret = await db.raw(query);
    return ret[0];
  };

  // map data
  self.findMap = async ({ title }) => {
    const query = `
    SELECT *
    FROM map
    WHERE map_name LIKE CONCAT('%',?,'%')
    `;
    const ret = await db.raw(query, [title]);
    return ret[0];
  };

  // updateheart
  self.updateheart = async ({ user, title }) => {
    const query = `
    INSERT INTO heart(user_id, title) VALUES(?, ?)
    `;
    await db.raw(query, [user, title]);
  };

  // deleteheart
  self.deleteheart = async ({ user, title }) => {
    const query = `
    DELETE FROM heart WHERE user_id = ? AND title = ?
    `;
    await db.raw(query, [user, title]);
  };

  // selectheart
  self.selectheart = async ({ user }) => {
    const query = `
    SELECT * FROM heart WHERE user_id = ?
    `;
    const ret = await db.raw(query, [user]);
    return ret[0];
  };

  // getallheart
  self.getallheart = async () => {
    const query = `
    SELECT * FROM heart
    `;
    const ret = await db.raw(query );
    return ret[0];
  };

  // 마이페이지 고객센터
  self.getBoard = async ({ user_id }) => {
    const query = `
    select content_no,
    title,
    context as category
    from content 
    where user_no = ?
    `;
    const ret = await db.raw(query, [user_id]);
    return ret[0];
  };

  

  // 마이페이지 좋아요
  self.getLike = async ({ user_id }) => {
    const query = `
    select loca_no,
    title,
    picture1 as category
    from location 
    where title in (select title from heart where user_id = ?)
    `;
    const ret = await db.raw(query, [user_id]);
    return ret[0];
  };


  // 회원탈퇴
  self.dropUser = async ({ user_id }) => {
    const query = `
      DELETE 
      FROM user 
      WHERE user_id = ?
    `;
    await db.raw(query, [user_id]);
  };

  self.dropUserToken = async ({ user_id }) => {
    const query = `
      DELETE 
      FROM user_refresh_token 
      WHERE user_id = ?
    `;
    await db.raw(query, [user_id]);
  };


  // 랜덤 게시물
  self.getRandom = async () => {
    const query = `
    select 
    loca_no,
    title,
    picture1,
    context1
    from location
    order by rand() limit 7
    `;
    const ret = await db.raw(query);
    return ret[0];
  };
module.exports = self;
```
