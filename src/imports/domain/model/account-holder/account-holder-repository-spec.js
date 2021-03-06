import {AccountHolderRepository} from './account-holder-repository';
import {AccountHolders} from '../../../infrastructure/collections'

describe('Account Holder Repository', function () {
  beforeEach(function () {
    this.accountHolder = {
      account: {
        branchNumber: 12345
      }
    };
  });
  describe('find', function () {
    it('should find the account holder by id', function () {
      spyOn(AccountHolders, 'findOne').and.returnValue(this.accountHolder);

      const actualAccountHolder = AccountHolderRepository.find('noMatter');

      expect(actualAccountHolder.constructor.name).toBe('AccountHolder');
      expect(actualAccountHolder).not.toBe(this.accountHolder);
    });
    it('should convert the account object into an Account instance', function () {
      spyOn(AccountHolders, 'findOne').and.returnValue(this.accountHolder);

      const actualAccountHolder = AccountHolderRepository.find('noMatter');

      expect(actualAccountHolder.account.constructor.name).toBe('Account');
    });
    describe('getNullAccountHolder', function () {
      it('should returns a NullObject', function () {
        const actualAccountHolder = AccountHolderRepository.getNullAccountHolder();

        expect(actualAccountHolder).toEqual({
          account: {}
        });
      });
    });
  });
  describe('insert', function () {
    it('should insert the account holder', function () {
      spyOn(AccountHolders, 'insert');

      AccountHolderRepository.insert(this.accountHolder);

      expect(AccountHolders.insert).toHaveBeenCalledWith(this.accountHolder);
    });
  });
  describe('update', function () {
    it('updates a given account holder', function () {
      spyOn(AccountHolders, 'update').and.returnValue(1);
      this.accountHolder._id = 'theId';

      var result = AccountHolderRepository.update(this.accountHolder);

      expect(result).toEqual(1);
      expect(AccountHolders.update).toHaveBeenCalledWith('theId', {$set: this.accountHolder});
    });
  });
});