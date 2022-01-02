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