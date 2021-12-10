/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ToadzgotchiInterface extends ethers.utils.Interface {
  functions: {
    "_toadzgotchiPetsContractAddress()": FunctionFragment;
    "fetchToadStats()": FunctionFragment;
    "grantXP(uint256)": FunctionFragment;
    "ownsToadzgotchis()": FunctionFragment;
    "readToadHunger()": FunctionFragment;
    "readToadPlay()": FunctionFragment;
    "readToadSleep()": FunctionFragment;
    "returnMsgSender()": FunctionFragment;
    "toadStats(uint256)": FunctionFragment;
    "toadz(uint256)": FunctionFragment;
    "toadzgotchiIdsOwned()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_toadzgotchiPetsContractAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fetchToadStats",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "grantXP",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "ownsToadzgotchis",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "readToadHunger",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "readToadPlay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "readToadSleep",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "returnMsgSender",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "toadStats",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "toadz", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "toadzgotchiIdsOwned",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "_toadzgotchiPetsContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fetchToadStats",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantXP", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownsToadzgotchis",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "readToadHunger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "readToadPlay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "readToadSleep",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "returnMsgSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "toadStats", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "toadz", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "toadzgotchiIdsOwned",
    data: BytesLike
  ): Result;

  events: {};
}

export class Toadzgotchi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ToadzgotchiInterface;

  functions: {
    _toadzgotchiPetsContractAddress(
      overrides?: CallOverrides
    ): Promise<[string]>;

    fetchToadStats(
      overrides?: CallOverrides
    ): Promise<
      [
        ([
          boolean,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          boolean
        ] & {
          isVibing: boolean;
          startVibingTime: BigNumber;
          isFedValue: BigNumber;
          lastFeedBlock: BigNumber;
          isHappyValue: BigNumber;
          lastPlayBlock: BigNumber;
          isRestedValue: BigNumber;
          lastSleepBlock: BigNumber;
          toadXP: BigNumber;
          toadLevel: BigNumber;
          isDead: boolean;
        })[]
      ]
    >;

    grantXP(
      giveXP: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ownsToadzgotchis(overrides?: CallOverrides): Promise<[boolean]>;

    readToadHunger(overrides?: CallOverrides): Promise<[BigNumber]>;

    readToadPlay(overrides?: CallOverrides): Promise<[BigNumber]>;

    readToadSleep(overrides?: CallOverrides): Promise<[BigNumber]>;

    returnMsgSender(overrides?: CallOverrides): Promise<[string]>;

    toadStats(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        boolean,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ] & {
        isVibing: boolean;
        startVibingTime: BigNumber;
        isFedValue: BigNumber;
        lastFeedBlock: BigNumber;
        isHappyValue: BigNumber;
        lastPlayBlock: BigNumber;
        isRestedValue: BigNumber;
        lastSleepBlock: BigNumber;
        toadXP: BigNumber;
        toadLevel: BigNumber;
        isDead: boolean;
      }
    >;

    toadz(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    toadzgotchiIdsOwned(overrides?: CallOverrides): Promise<[BigNumber[]]>;
  };

  _toadzgotchiPetsContractAddress(overrides?: CallOverrides): Promise<string>;

  fetchToadStats(
    overrides?: CallOverrides
  ): Promise<
    ([
      boolean,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      boolean
    ] & {
      isVibing: boolean;
      startVibingTime: BigNumber;
      isFedValue: BigNumber;
      lastFeedBlock: BigNumber;
      isHappyValue: BigNumber;
      lastPlayBlock: BigNumber;
      isRestedValue: BigNumber;
      lastSleepBlock: BigNumber;
      toadXP: BigNumber;
      toadLevel: BigNumber;
      isDead: boolean;
    })[]
  >;

  grantXP(
    giveXP: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ownsToadzgotchis(overrides?: CallOverrides): Promise<boolean>;

  readToadHunger(overrides?: CallOverrides): Promise<BigNumber>;

  readToadPlay(overrides?: CallOverrides): Promise<BigNumber>;

  readToadSleep(overrides?: CallOverrides): Promise<BigNumber>;

  returnMsgSender(overrides?: CallOverrides): Promise<string>;

  toadStats(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      boolean,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      boolean
    ] & {
      isVibing: boolean;
      startVibingTime: BigNumber;
      isFedValue: BigNumber;
      lastFeedBlock: BigNumber;
      isHappyValue: BigNumber;
      lastPlayBlock: BigNumber;
      isRestedValue: BigNumber;
      lastSleepBlock: BigNumber;
      toadXP: BigNumber;
      toadLevel: BigNumber;
      isDead: boolean;
    }
  >;

  toadz(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  toadzgotchiIdsOwned(overrides?: CallOverrides): Promise<BigNumber[]>;

  callStatic: {
    _toadzgotchiPetsContractAddress(overrides?: CallOverrides): Promise<string>;

    fetchToadStats(
      overrides?: CallOverrides
    ): Promise<
      ([
        boolean,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ] & {
        isVibing: boolean;
        startVibingTime: BigNumber;
        isFedValue: BigNumber;
        lastFeedBlock: BigNumber;
        isHappyValue: BigNumber;
        lastPlayBlock: BigNumber;
        isRestedValue: BigNumber;
        lastSleepBlock: BigNumber;
        toadXP: BigNumber;
        toadLevel: BigNumber;
        isDead: boolean;
      })[]
    >;

    grantXP(giveXP: BigNumberish, overrides?: CallOverrides): Promise<void>;

    ownsToadzgotchis(overrides?: CallOverrides): Promise<boolean>;

    readToadHunger(overrides?: CallOverrides): Promise<BigNumber>;

    readToadPlay(overrides?: CallOverrides): Promise<BigNumber>;

    readToadSleep(overrides?: CallOverrides): Promise<BigNumber>;

    returnMsgSender(overrides?: CallOverrides): Promise<string>;

    toadStats(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        boolean,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ] & {
        isVibing: boolean;
        startVibingTime: BigNumber;
        isFedValue: BigNumber;
        lastFeedBlock: BigNumber;
        isHappyValue: BigNumber;
        lastPlayBlock: BigNumber;
        isRestedValue: BigNumber;
        lastSleepBlock: BigNumber;
        toadXP: BigNumber;
        toadLevel: BigNumber;
        isDead: boolean;
      }
    >;

    toadz(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    toadzgotchiIdsOwned(overrides?: CallOverrides): Promise<BigNumber[]>;
  };

  filters: {};

  estimateGas: {
    _toadzgotchiPetsContractAddress(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fetchToadStats(overrides?: CallOverrides): Promise<BigNumber>;

    grantXP(
      giveXP: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ownsToadzgotchis(overrides?: CallOverrides): Promise<BigNumber>;

    readToadHunger(overrides?: CallOverrides): Promise<BigNumber>;

    readToadPlay(overrides?: CallOverrides): Promise<BigNumber>;

    readToadSleep(overrides?: CallOverrides): Promise<BigNumber>;

    returnMsgSender(overrides?: CallOverrides): Promise<BigNumber>;

    toadStats(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toadz(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    toadzgotchiIdsOwned(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _toadzgotchiPetsContractAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fetchToadStats(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    grantXP(
      giveXP: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ownsToadzgotchis(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    readToadHunger(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    readToadPlay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    readToadSleep(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    returnMsgSender(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    toadStats(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    toadz(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    toadzgotchiIdsOwned(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
