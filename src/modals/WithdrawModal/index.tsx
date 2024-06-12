import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { CurrencyName } from 'appConstants';
import { illustrationTgLightImage } from 'assets/images';
import { ModalContext } from 'context';
import { getTransactionsRatesData, withdrawTransactions } from 'store/transactions/actionCreators';
import { transactionsSelectors } from 'store/transactions/selectors';

import {
  Button,
  Checkbox,
  Image,
  Input,
  Modal,
  toastSuccess,
} from 'components';

import styles from './styles.module.scss';

export const WithdrawModal = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation('deposit');
  const trans = useTranslation('main').t;
  const { closeJsxModal } = useContext(ModalContext);

  const { rate, isLoading } = useSelector(transactionsSelectors.getState);

  const [amount, setAmount] = useState('');
  const [amountEuro, setAmountEuro] = useState('');
  const [description, setDescription] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [receivingCountry, setReceivingCountry] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [iban, setIban] = useState('');
  const [swift, setSWIFT] = useState('');
  const [bankName, setBankName] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [correspondentAccount, setCorrespondentAccount] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [bankCity, setBankCity] = useState('');
  const [isCorresp, setIsCorresp] = useState(false);
  const [isEuro, setIsEuro] = useState(false);

  const isDisableBnt = !(amount || amountEuro) || !description || !paymentDetails;

  useEffect(() => {
    dispatch(getTransactionsRatesData());
  }, [dispatch]);

  useEffect(() => {
    setAmountEuro((Number(amount) * Number(rate)).toFixed(2) || '');
  }, [setAmountEuro, amount, rate]);

  const onChangeAmount = useCallback((n: string) => {
    setAmount(n);
  }, [setAmount]);

  const onChangeDescription = useCallback((n: string) => {
    setDescription(n);
  }, [setDescription]);

  const onChangePaymentDetails = useCallback((n: string) => {
    setPaymentDetails(n);
  }, [setPaymentDetails]);

  const onCloseJsxModal = useCallback(() => {
    closeJsxModal();
  }, [closeJsxModal]);

  const onSuccess = useCallback(() => {
    closeJsxModal();
    toastSuccess(t('Operation_success_'));
  }, [closeJsxModal, t]);

  const onWithdrawChange = useCallback(() => {
    dispatch(withdrawTransactions({
      currency: isEuro ? CurrencyName.EUR : CurrencyName.USD,
      amount: isEuro ? amountEuro : amount,
      description,
      payment_details: paymentDetails,
      receiving_country: receivingCountry,
      name,
      address,
      city,
      country,
      iban,
      swift,
      bank_account_name: bankName,
      swift_code: swiftCode,
      bank_account_correspondent_account: correspondentAccount,
      bank_account_address: bankAddress,
      bank_account_city: bankCity,
      onCallback: onSuccess,
    }));
  }, [
    dispatch,
    isEuro,
    amount,
    amountEuro,
    description,
    paymentDetails,
    receivingCountry,
    name,
    address,
    city,
    country,
    iban,
    swift,
    bankName,
    swiftCode,
    correspondentAccount,
    bankAddress,
    bankCity,
    onSuccess,
  ]);

  useEffect(() => {
    if (!isCorresp) {
      setBankName('');
      setSwiftCode('');
      setCorrespondentAccount('');
      setBankAddress('');
      setBankCity('');
    }
  }, [
    isCorresp,
    setBankName,
    setSwiftCode,
    setCorrespondentAccount,
    setBankAddress,
    setBankCity,
  ]);

  return (
    <Modal
      isOpen
      onClose={onCloseJsxModal}
      className={styles.deposit_container}
    >
      <Image
        url={illustrationTgLightImage}
        className={styles.deposit_img}
      />
      <div className={styles.deposit_title}>
        {t('Withdraw_funds_')}
      </div>
      <div className={cn(styles.deposit_input, styles.deposit_input_text)}>
        {t('Minimum_withdrawal_amount_')}
      </div>
      <Input
        isNumberOnly
        classNameContainer={styles.deposit_input}
        value={amount}
        onChangeValue={onChangeAmount}
        placeholder={`${t('Enter_amount_')}, $`}
      />
      <Checkbox
        isChecked={isEuro}
        onChange={setIsEuro}
        label={t('Withdraw_in_euros_')}
        classNameContainer={styles.deposit_input}
      />
      {isEuro && (
        <Input
          classNameContainer={styles.deposit_input}
          value={amountEuro}
          disabled
          label={t('Amount_euro_rate_')}
        />
      )}
      <Input
        classNameContainer={styles.deposit_input}
        value={paymentDetails}
        onChangeValue={onChangePaymentDetails}
        placeholder={t('Requisites_')}
      />
      <Input
        classNameContainer={styles.deposit_input}
        value={description}
        onChangeValue={onChangeDescription}
        placeholder={t('Comment_')}
      />
      <Input
        classNameContainer={styles.deposit_input}
        value={receivingCountry}
        onChangeValue={setReceivingCountry}
        placeholder={t('Receiving_country_')}
      />
      <Input
        classNameContainer={styles.deposit_input}
        value={name}
        onChangeValue={setName}
        placeholder={t('Name_')}
      />
      <Input
        classNameContainer={styles.deposit_input}
        value={address}
        onChangeValue={setAddress}
        placeholder={t('Address_')}
      />
      <Input
        classNameContainer={styles.deposit_input}
        value={city}
        onChangeValue={setCity}
        placeholder={t('City_')}
      />
      <Input
        classNameContainer={styles.deposit_input}
        value={country}
        onChangeValue={setCountry}
        placeholder={t('Country_')}
      />
      <Input
        classNameContainer={styles.deposit_input}
        value={iban}
        onChangeValue={setIban}
        placeholder={t('IBAN_')}
      />
      <Input
        classNameContainer={styles.deposit_input}
        value={swift}
        onChangeValue={setSWIFT}
        placeholder={t('SWIFT_')}
      />
      <Checkbox
        isChecked={isCorresp}
        onChange={setIsCorresp}
        label={t('Correspondent_account_')}
        classNameContainer={styles.deposit_input}
      />
      {isCorresp && (
        <>
          <Input
            classNameContainer={styles.deposit_input}
            value={bankName}
            onChangeValue={setBankName}
            placeholder={t('Bank_name_')}
          />
          <Input
            classNameContainer={styles.deposit_input}
            value={swiftCode}
            onChangeValue={setSwiftCode}
            placeholder={t('SWIFT_code_')}
          />
          <Input
            classNameContainer={styles.deposit_input}
            value={correspondentAccount}
            onChangeValue={setCorrespondentAccount}
            placeholder={t('Correspondent_account_')}
          />
          <Input
            classNameContainer={styles.deposit_input}
            value={bankAddress}
            onChangeValue={setBankAddress}
            placeholder={t('Bank_address_')}
          />
          <Input
            classNameContainer={styles.deposit_input}
            value={bankCity}
            onChangeValue={setBankCity}
            placeholder={t('City_')}
          />
        </>
      )}
      <Button
        disabled={isDisableBnt}
        onClick={onWithdrawChange}
        isFullWidth
        isBigHeight
        isLoading={isLoading}
      >
        {trans('Withdraw_')}
      </Button>
    </Modal>
  );
});
