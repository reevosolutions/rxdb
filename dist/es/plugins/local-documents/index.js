import { getLocal, getLocal$, insertLocal, upsertLocal } from './local-documents';
import { closeStateByParent, createLocalDocStateByParent, removeLocalDocumentsStorageInstance } from './local-documents-helper';
export * from './local-documents';
export * from './rx-local-document';
export var RxDBLocalDocumentsPlugin = {
  name: 'local-documents',
  rxdb: true,
  prototypes: {
    RxCollection: function RxCollection(proto) {
      proto.insertLocal = insertLocal;
      proto.upsertLocal = upsertLocal;
      proto.getLocal = getLocal;
      proto.getLocal$ = getLocal$;
    },
    RxDatabase: function RxDatabase(proto) {
      proto.insertLocal = insertLocal;
      proto.upsertLocal = upsertLocal;
      proto.getLocal = getLocal;
      proto.getLocal$ = getLocal$;
    }
  },
  hooks: {
    createRxDatabase: {
      before: function before(args) {
        if (args.creator.localDocuments) {
          /**
           * We do not have to await
           * the creation to speed up initial page load.
           */

          /* await */
          createLocalDocStateByParent(args.database);
        }
      }
    },
    createRxCollection: {
      before: function before(args) {
        if (args.creator.localDocuments) {
          /**
           * We do not have to await
           * the creation to speed up initial page load.
           */

          /* await */
          createLocalDocStateByParent(args.collection);
        }
      }
    },
    preDestroyRxDatabase: {
      after: function after(db) {
        return closeStateByParent(db);
      }
    },
    postDestroyRxCollection: {
      after: function after(collection) {
        return closeStateByParent(collection);
      }
    },
    postRemoveRxDatabase: {
      after: function after(args) {
        return removeLocalDocumentsStorageInstance(args.storage, args.databaseName, '');
      }
    },
    postRemoveRxCollection: {
      after: function after(args) {
        return removeLocalDocumentsStorageInstance(args.storage, args.databaseName, args.collectionName);
      }
    }
  },
  overwritable: {}
};
//# sourceMappingURL=index.js.map