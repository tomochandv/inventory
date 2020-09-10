-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- user_info Table Create SQL
CREATE TABLE user_info
(
    `useridx`  INT             NOT NULL    AUTO_INCREMENT COMMENT '회원아이디', 
    `email`    VARCHAR(200)    NOT NULL    COMMENT '이메일', 
    `pass`     TEXT            NOT NULL    COMMENT '비번', 
    `use_yn`   VARCHAR(1)      NOT NULL    COMMENT '사용여부', 
    `regdate`  DATETIME        NOT NULL    COMMENT '등록일', 
    PRIMARY KEY (useridx)
);

ALTER TABLE user_info COMMENT '회원정보';


-- user_info Table Create SQL
CREATE TABLE category_info
(
    `caidx`    INT             NOT NULL    AUTO_INCREMENT COMMENT '카테고리아이디', 
    `useridx`  INT             NOT NULL    COMMENT '회원아이디', 
    `ca_nm`    VARCHAR(100)    NOT NULL    COMMENT '카테고리명', 
    `regdate`  DATETIME        NOT NULL    COMMENT '등록일', 
    PRIMARY KEY (caidx)
);

ALTER TABLE category_info COMMENT '카테고리 마스터';

ALTER TABLE category_info
    ADD CONSTRAINT FK_category_info_useridx_user_info_useridx FOREIGN KEY (useridx)
        REFERENCES user_info (useridx) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user_info Table Create SQL
CREATE TABLE category_depth1
(
    `subidx`   INT             NOT NULL    AUTO_INCREMENT COMMENT '카테고리 서브1', 
    `caidx`    INT             NOT NULL    COMMENT '카테고리 마스터', 
    `sub_nm`   VARCHAR(100)    NOT NULL    COMMENT '서브명', 
    `regdate`  DATETIME        NOT NULL    COMMENT '등록일', 
    PRIMARY KEY (subidx)
);

ALTER TABLE category_depth1 COMMENT '카테고리 뎁스1';

ALTER TABLE category_depth1
    ADD CONSTRAINT FK_category_depth1_caidx_category_info_caidx FOREIGN KEY (caidx)
        REFERENCES category_info (caidx) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user_info Table Create SQL
CREATE TABLE category_depth2
(
    `botidx`   INT             NOT NULL    AUTO_INCREMENT COMMENT '카테고리 서브2', 
    `subidx`   INT             NOT NULL    COMMENT '카테고리 서브1', 
    `bot_nm`   VARCHAR(100)    NOT NULL    COMMENT '서브명', 
    `regdate`  DATETIME        NOT NULL    COMMENT '등록일', 
    PRIMARY KEY (botidx)
);

ALTER TABLE category_depth2 COMMENT '카테고리 뎁스2';

ALTER TABLE category_depth2
    ADD CONSTRAINT FK_category_depth2_subidx_category_depth1_subidx FOREIGN KEY (subidx)
        REFERENCES category_depth1 (subidx) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user_info Table Create SQL
CREATE TABLE products_info
(
    `pridx`    INT             NOT NULL    AUTO_INCREMENT COMMENT '물품아이디', 
    `caidx`    INT             NOT NULL    COMMENT '카테고리 마스터', 
    `subidx`   INT             NOT NULL    COMMENT '카테고리 서브1', 
    `botidx`   INT             NOT NULL    COMMENT '카테고리 서브2', 
    `useridx`  INT             NOT NULL    COMMENT '회원아이디', 
    `pr_nm`    VARCHAR(200)    NOT NULL    COMMENT '물품명', 
    `pr_desc`  TEXT            NULL        COMMENT '특이사항', 
    `qty`      BIGINT          NOT NULL    COMMENT '총수량', 
    `use_yn`   VARCHAR(1)      NOT NULL    COMMENT '사용여부', 
    `regdate`  DATETIME        NOT NULL    COMMENT '등록일', 
    PRIMARY KEY (pridx)
);

ALTER TABLE products_info COMMENT '물품마스터';

ALTER TABLE products_info
    ADD CONSTRAINT FK_products_info_useridx_user_info_useridx FOREIGN KEY (useridx)
        REFERENCES user_info (useridx) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE products_info
    ADD CONSTRAINT FK_products_info_botidx_category_depth2_botidx FOREIGN KEY (botidx)
        REFERENCES category_depth2 (botidx) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE products_info
    ADD CONSTRAINT FK_products_info_subidx_category_depth1_subidx FOREIGN KEY (subidx)
        REFERENCES category_depth1 (subidx) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE products_info
    ADD CONSTRAINT FK_products_info_caidx_category_info_caidx FOREIGN KEY (caidx)
        REFERENCES category_info (caidx) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user_info Table Create SQL
CREATE TABLE products_history
(
    `pridx`    INT         NOT NULL    COMMENT '물품아이디', 
    `qty`      BIGINT      NOT NULL    COMMENT '수량', 
    `price`    BIGINT      NOT NULL    COMMENT '매입가', 
    `regdate`  DATETIME    NOT NULL    COMMENT '날짜', 
    PRIMARY KEY (pridx, regdate)
);

ALTER TABLE products_history COMMENT '물품기록';

ALTER TABLE products_history
    ADD CONSTRAINT FK_products_history_pridx_products_info_pridx FOREIGN KEY (pridx)
        REFERENCES products_info (pridx) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user_info Table Create SQL
CREATE TABLE user_login
(
    `email`                  VARCHAR(200)    NULL        COMMENT '이메일', 
    `ip`                     VARCHAR(30)     NULL        COMMENT '아이피', 
    `is_success`             VARCHAR(1)      NULL        COMMENT '성공여부', 
    `regdate`                DATETIME        NULL        COMMENT '날짜', 
    `isYaBrowser`            VARCHAR(100)    NULL, 
    `isAuthoritative`        VARCHAR(100)    NULL, 
    `isMobile`               VARCHAR(100)    NULL, 
    `isMobileNative`         VARCHAR(100)    NULL, 
    `isTablet`               VARCHAR(100)    NULL, 
    `isiPad`                 VARCHAR(100)    NULL, 
    `isiPod`                 VARCHAR(100)    NULL, 
    `isiPhone`               VARCHAR(100)    NULL, 
    `isiPhoneNative`         VARCHAR(100)    NULL, 
    `isAndroid`              VARCHAR(100)    NULL, 
    `isAndroidNative`        VARCHAR(100)    NULL, 
    `isBlackberry`           VARCHAR(100)    NULL, 
    `isOpera`                VARCHAR(100)    NULL, 
    `isIE`                   VARCHAR(100)    NULL, 
    `isEdge`                 VARCHAR(100)    NULL, 
    `isIECompatibilityMode`  VARCHAR(100)    NULL, 
    `isSafari`               VARCHAR(100)    NULL, 
    `isFirefox`              VARCHAR(100)    NULL, 
    `isWebkit`               VARCHAR(100)    NULL, 
    `isChrome`               VARCHAR(100)    NULL, 
    `isKonqueror`            VARCHAR(100)    NULL, 
    `isOmniWeb`              VARCHAR(100)    NULL, 
    `isSeaMonkey`            VARCHAR(100)    NULL, 
    `isFlock`                VARCHAR(100)    NULL, 
    `isAmaya`                VARCHAR(100)    NULL, 
    `isPhantomJS`            VARCHAR(100)    NULL, 
    `isEpiphany`             VARCHAR(100)    NULL, 
    `isDesktop`              VARCHAR(100)    NULL, 
    `isWindows`              VARCHAR(100)    NULL, 
    `isLinux`                VARCHAR(100)    NULL, 
    `isLinux64`              VARCHAR(100)    NULL, 
    `isMac`                  VARCHAR(100)    NULL, 
    `isChromeOS`             VARCHAR(100)    NULL, 
    `isBada`                 VARCHAR(100)    NULL, 
    `isSamsung`              VARCHAR(100)    NULL, 
    `isRaspberry`            VARCHAR(100)    NULL, 
    `isBot`                  VARCHAR(100)    NULL, 
    `isCurl`                 VARCHAR(100)    NULL, 
    `isAndroidTablet`        VARCHAR(100)    NULL, 
    `isWinJs`                VARCHAR(100)    NULL, 
    `isKindleFire`           VARCHAR(100)    NULL, 
    `isSilk`                 VARCHAR(100)    NULL, 
    `isCaptive`              VARCHAR(100)    NULL, 
    `isSmartTV`              VARCHAR(100)    NULL, 
    `isUC`                   VARCHAR(100)    NULL, 
    `isFacebook`             VARCHAR(100)    NULL, 
    `isAlamoFire`            VARCHAR(100)    NULL, 
    `isElectron`             VARCHAR(100)    NULL, 
    `silkAccelerated`        VARCHAR(300)    NULL, 
    `browser`                VARCHAR(300)    NULL, 
    `version`                VARCHAR(300)    NULL, 
    `os`                     VARCHAR(300)    NULL, 
    `platform`               VARCHAR(100)    NULL, 
    `source`                 VARCHAR(300)    NULL, 
    `isWechat`               VARCHAR(300)    NULL, 
    `electronVersion`        VARCHAR(300)    NULL   
);

ALTER TABLE user_login COMMENT '로그인기록';


