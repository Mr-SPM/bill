const DB_NAME = 'BILL';
let DB_VERSION = 1;
const DB_Store_NAME = 'DEAL';
var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;
const log = e => {
  console.log(e);
};
// 打开数据库
// const openDB = version => {
//   return new Promise((resolve, reject) => {
//     let request = indexedDB.open(DB_NAME, version);
//     request.onerror = e => {
//       log(e);
//       reject(e);
//     };
//     request.onupgradeneeded = e => {
//       console.log('Upgrading../');
//       const db = e.target.result;
//       if (!db.objectStoreNames.contains(DB_Store_NAME)) {
//         db.createObjectStore(DB_Store_NAME, { autoIncrement: true });
//       }
//     };
//     request.onsuccess = e => {
//       log('Success!');
//       resolve(e.target.result);
//     };
//   });
// };
// // 检测表是否存在
// const getStoreByName = (db, name, type = false) => {
//   let transaction = db.transaction(name, type ? 'readwrite' : 'readonly');
//   return transaction.objectStore(name);
// };

// // 封装打开Store方法
// const openStore = async type => {
//   const db = await openDB(DB_VERSION);
//   const store = await getStoreByName(db, DB_Store_NAME, type);
//   return store;
// };

// const storeAdd = (store, obj) => {
//   return new Promise((resolve, reject) => {
//     const op = store.add(obj);
//     op.onsuccess = e => {
//       resolve('success');
//     };
//     op.onerror = log;
//   });
// };

// const storeGet = (store, key) => {
//   return new Promise((resolve, reject) => {
//     const op = store.get(key);
//     op.onsuccess = e => {
//       resolve(e.target.result);
//     };
//     op.onerror = log;
//   });
// };
const dbOp = {
  openDB(version) {
    return new Promise((resolve, reject) => {
      let request = indexedDB.open(DB_NAME, version);
      request.onerror = e => {
        log(e);
        reject(e);
      };
      request.onupgradeneeded = e => {
        console.log('Upgrading../');
        const db = e.target.result;
        if (!db.objectStoreNames.contains(DB_Store_NAME)) {
          const store = db.createObjectStore(DB_Store_NAME, {
            autoIncrement: true
          });
          store.createIndex('time', 'time', { unique: false });
          store.createIndex('categoryid', 'categoryid', { unique: false });
        }
      };
      request.onsuccess = e => {
        log('Success!');
        resolve(e.target.result);
      };
    });
  },
  getStoreByName(db, name, type = false) {
    let transaction = db.transaction(name, type ? 'readwrite' : 'readonly');
    return transaction.objectStore(name);
  },
  openStore: async function(type) {
    const db = await this.openDB(DB_VERSION);
    const store = await this.getStoreByName(db, DB_Store_NAME, type);
    return store;
  },
  get(store, key) {
    return new Promise((resolve, reject) => {
      const op = store.get(key);
      op.onsuccess = e => {
        resolve(e.target.result);
      };
      op.onerror = log;
    });
  },
  add(store, obj) {
    return new Promise((resolve, reject) => {
      const op = store.add(obj);
      op.onsuccess = e => {
        resolve('success');
      };
      op.onerror = log;
    });
  },
  put(store, key, obj) {
    return new Promise((resolve, reject) => {
      const op = store.put(key, obj);
      op.onsuccess = e => {
        resolve(true);
      };
      op.onerror = log;
    });
  },
  openCursor(store, range) {
    return new Promise((resolve, reject) => {
      let result = [];
      let op;
      if (range) {
        op = store.openCursor(range);
      } else {
        op = store.openCursor();
      }
      op.onsuccess = e => {
        const res = e.target.result;
        if (res) {
          result.push({ key: res.key, value: res.value });
          res.continue();
        } else {
          resolve(result);
        }
      };
      op.onerror = e => {
        reject(e);
      };
    });
  },
  indexGet(store, key, name) {
    return new Promise((resolve, reject) => {
      const indexData = store.index(key);
      const op = indexData.get(name);
      op.onsuccess = res => {
        resolve(res.target.result);
      };
      op.onerror = e => {
        reject(e);
      };
    });
  },
  /*
   指定数据读取范围，返回数据,利用浏览器原生的IDBKeyRange对象，IDBKeyRange的作用是生成一个表示范围的Range对象。下面是生成方法：
   lowerBound: 指定范围的下限
   upperBound：指定范围的上限
   bound： 指定范围的上下限
   only： 指定范围中的一个值
   默认包括端点值，可以传入一个布尔值修改这个属性
   */
  indexFilter(store, name, range) {
    const indexData = store.index(name);
    let filterRange;
    if (range.start === range.end) {
      filterRange = IDBKeyRange.only(range.start);
    } else {
      filterRange = IDBKeyRange.bound(range.start, range.end);
    }
    // 调用openCursor方法
    return this.openCursor(indexData, filterRange);
  },
  delete(store, key) {
    return new Promise((resolve, reject) => {
      const op = store.delete(key);
      op.onsuccess = e => {
        resolve(true);
      };
      op.onerror = e => {
        reject(false);
      };
    });
  }
};

export default {
  // async AddDataBase() {
  //   const db = await openDB(1);
  //   db.close();
  // },
  async add(obj) {
    const store = await dbOp.openStore(true);
    return dbOp.add(store, obj);
  },
  async get(key) {
    const store = await dbOp.openStore(true);
    return dbOp.get(store, key);
  },
  async put(key, obj) {
    const store = await dbOp.openStore(true);
    return dbOp.put(store, key, obj);
  },
  async openCursor() {
    const store = await dbOp.openStore(true);
    return dbOp.openCursor(store);
  },
  async indexGet(name, key) {
    const store = await dbOp.openStore(true);
    return dbOp.indexGet(store, name, key);
  },
  async indexFilter(name, range) {
    const store = await dbOp.openStore();
    return dbOp.indexFilter(store, name, range);
  },
  async delete(key) {
    const store = await dbOp.openStore();
    return dbOp.delete(store, key);
  }
};
