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
    "calcDecayFeed()": FunctionFragment;
    "calcDecayPlay()": FunctionFragment;
    "calcDecaySleep()": FunctionFragment;
    "feedToad(uint256)": FunctionFragment;
    "grantXP(uint256)": FunctionFragment;
    "isFeedable()": FunctionFragment;
    "isPlayable()": FunctionFragment;
    "isSleepable()": FunctionFragment;
    "playToad(uint256)": FunctionFragment;
    "readToadHunger()": FunctionFragment;
    "readToadPlay()": FunctionFragment;
    "readToadSleep()": FunctionFragment;
    "readToadStats()": FunctionFragment;
    "returnMsgSender()": FunctionFragment;
    "sleepToad(uint256)": FunctionFragment;
    "startVibing()": FunctionFragment;
    "toadStats(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calcDecayFeed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calcDecayPlay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calcDecaySleep",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "feedToad",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "grantXP",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isFeedable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isPlayable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isSleepable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "playToad",
    values: [BigNumberish]
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
    functionFragment: "readToadStats",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "returnMsgSender",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sleepToad",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "startVibing",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "toadStats", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "calcDecayFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcDecayPlay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcDecaySleep",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feedToad", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantXP", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isFeedable", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isPlayable", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isSleepable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "playToad", data: BytesLike): Result;
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
    functionFragment: "readToadStats",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "returnMsgSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sleepToad", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "startVibing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "toadStats", data: BytesLike): Result;

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
    calcDecayFeed(overrides?: CallOverrides): Promise<[BigNumber]>;

    calcDecayPlay(overrides?: CallOverrides): Promise<[BigNumber]>;

    calcDecaySleep(overrides?: CallOverrides): Promise<[BigNumber]>;

    feedToad(
      feedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    grantXP(
      giveXP: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isFeedable(overrides?: CallOverrides): Promise<[boolean]>;

    isPlayable(overrides?: CallOverrides): Promise<[boolean]>;

    isSleepable(overrides?: CallOverrides): Promise<[boolean]>;

    playToad(
      playValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    readToadHunger(overrides?: CallOverrides): Promise<[BigNumber]>;

    readToadPlay(overrides?: CallOverrides): Promise<[BigNumber]>;

    readToadSleep(overrides?: CallOverrides): Promise<[BigNumber]>;

    readToadStats(
      overrides?: CallOverrides
    ): Promise<
      [
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
      ]
    >;

    returnMsgSender(overrides?: CallOverrides): Promise<[string]>;

    sleepToad(
      sleepValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    startVibing(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    toadStats(
      arg0: string,
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
  };

  calcDecayFeed(overrides?: CallOverrides): Promise<BigNumber>;

  calcDecayPlay(overrides?: CallOverrides): Promise<BigNumber>;

  calcDecaySleep(overrides?: CallOverrides): Promise<BigNumber>;

  feedToad(
    feedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  grantXP(
    giveXP: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isFeedable(overrides?: CallOverrides): Promise<boolean>;

  isPlayable(overrides?: CallOverrides): Promise<boolean>;

  isSleepable(overrides?: CallOverrides): Promise<boolean>;

  playToad(
    playValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  readToadHunger(overrides?: CallOverrides): Promise<BigNumber>;

  readToadPlay(overrides?: CallOverrides): Promise<BigNumber>;

  readToadSleep(overrides?: CallOverrides): Promise<BigNumber>;

  readToadStats(
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

  returnMsgSender(overrides?: CallOverrides): Promise<string>;

  sleepToad(
    sleepValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  startVibing(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  toadStats(
    arg0: string,
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

  callStatic: {
    calcDecayFeed(overrides?: CallOverrides): Promise<BigNumber>;

    calcDecayPlay(overrides?: CallOverrides): Promise<BigNumber>;

    calcDecaySleep(overrides?: CallOverrides): Promise<BigNumber>;

    feedToad(feedValue: BigNumberish, overrides?: CallOverrides): Promise<void>;

    grantXP(giveXP: BigNumberish, overrides?: CallOverrides): Promise<void>;

    isFeedable(overrides?: CallOverrides): Promise<boolean>;

    isPlayable(overrides?: CallOverrides): Promise<boolean>;

    isSleepable(overrides?: CallOverrides): Promise<boolean>;

    playToad(playValue: BigNumberish, overrides?: CallOverrides): Promise<void>;

    readToadHunger(overrides?: CallOverrides): Promise<BigNumber>;

    readToadPlay(overrides?: CallOverrides): Promise<BigNumber>;

    readToadSleep(overrides?: CallOverrides): Promise<BigNumber>;

    readToadStats(
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

    returnMsgSender(overrides?: CallOverrides): Promise<string>;

    sleepToad(
      sleepValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    startVibing(overrides?: CallOverrides): Promise<void>;

    toadStats(
      arg0: string,
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
  };

  filters: {};

  estimateGas: {
    calcDecayFeed(overrides?: CallOverrides): Promise<BigNumber>;

    calcDecayPlay(overrides?: CallOverrides): Promise<BigNumber>;

    calcDecaySleep(overrides?: CallOverrides): Promise<BigNumber>;

    feedToad(
      feedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    grantXP(
      giveXP: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isFeedable(overrides?: CallOverrides): Promise<BigNumber>;

    isPlayable(overrides?: CallOverrides): Promise<BigNumber>;

    isSleepable(overrides?: CallOverrides): Promise<BigNumber>;

    playToad(
      playValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    readToadHunger(overrides?: CallOverrides): Promise<BigNumber>;

    readToadPlay(overrides?: CallOverrides): Promise<BigNumber>;

    readToadSleep(overrides?: CallOverrides): Promise<BigNumber>;

    readToadStats(overrides?: CallOverrides): Promise<BigNumber>;

    returnMsgSender(overrides?: CallOverrides): Promise<BigNumber>;

    sleepToad(
      sleepValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    startVibing(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    toadStats(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    calcDecayFeed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    calcDecayPlay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    calcDecaySleep(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feedToad(
      feedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    grantXP(
      giveXP: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isFeedable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isPlayable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isSleepable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    playToad(
      playValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    readToadHunger(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    readToadPlay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    readToadSleep(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    readToadStats(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    returnMsgSender(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sleepToad(
      sleepValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    startVibing(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    toadStats(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
