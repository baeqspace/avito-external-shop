

-- @block

drop table AvitoItems;

create table AvitoItems (
    id bigint(20),
    itemName varchar(255),
    price int,
    startTime int,
    itemLocation varchar(255),
    photos varchar(1000),
    avitoLink varchar(500)
);


-- @block

insert into AvitoItems (ItemName, Price, StartTime, ItemLocation, PhotosID, AvitoLink)
values ('name', 1, 1, 'location', 2, 'link');

-- @block

insert into Photos (ItemID, PhotoLink)
values (2, 'test'), (2, 'sample');

-- @block
update Users set cart = "[]" where id=1;

-- @block
select * from Users


-- @block
select a.ItemName, a.Price, a.StartTime, a.ItemLocation, a.AvitoLink, p.ItemID, group_concat(p.PhotoLink) as PhotoLinks from AvitoItems as a
join Photos as p
on a.PhotosID = p.ItemID
group by a.ItemName, a.Price, a.StartTime, a.ItemLocation, a.AvitoLink, p.ItemID


-- @block
alter table AvitoItems
rename column AvitoLink to avitoLink

-- @block
drop table Users;


-- @block
create table Users (
    id int primary key auto_increment,
    email varchar(255),
    pass varchar(500),
    roles varchar(255),
    cart varchar(1000)
)





-- @block
create table SocialUsers (
    id int primary key auto_increment,
    email varchar(255),
    pass varchar(500),
    roles varchar(255),
    firstName varchar(255),
    lastName varchar(255),
    city varchar(255),
    phone varchar(255),
    enjoys varchar(500),
    friendsWith varchar(500),
    avatarLink varchar(255),
    photos varchar(1000),
    videos varchar(1000),
    music varchar(1000),
    groupsIn varchar(1000)
);

-- @block
select * from SocialUsers

-- @block
update SocialUsers set groupsIn='[]'


-- @block
drop table SocialPosts

-- @block
create table SocialPosts (
    id int primary key auto_increment,
    pageId varchar(255),
    dateAndTime bigint(20),
    postText mediumtext
);

-- @block
select * from SocialPosts


-- @block
create table SocialMessages (
    id int primary key auto_increment,
    roomId int,
    senderId int,
    dateAndTime bigint(20),
    messageText mediumtext
);

-- @block
select * from SocialMessages

-- @block
drop table SocialRooms;

create table SocialRooms (
    id int primary key auto_increment,
    users varchar(255)
);

-- @block
select * from SocialRooms





-- @block
drop table SocialMusic;

create table SocialMusic (
    id varchar(100),
    musicpath varchar(500),
    nameOfFile varchar(500)
);

-- @block
select * from SocialPhotos

-- @block
create table SocialMediaComments (
    id int primary key auto_increment,
    mediaId varchar(255),
    authorId int,
    commentText varchar(1000)
);

-- @block
select * from SocialMediaComments


-- @block
drop table SocialGroups;

create table SocialGroups (
    id varchar(50),
    ownerId int,
    groupName varchar(255),
    groupCategory varchar(255),
    groupDesc varchar(500),
    members varchar(1000),
    avatarLink varchar(255)
)

-- @block
select * from SocialGroups

-- @block
delete from SocialGroups