export default class TimeSpan {
  public static readonly TICK_TO_MS = 1e-4;
  public static readonly TICK_TO_SECOND = 1e-7;

  public static readonly SECOND_TO_TICK = 1e7;

  private readonly _ticks: number;

  public constructor(ticks: number) {
    if (ticks === null || ticks === undefined) {
      throw new Error("NullException");
    }
    this._ticks = ticks <= 0 ? 0 : ticks;
  }

  public static readonly Zero = new TimeSpan(0);
  public static readonly OneSecond = new TimeSpan(TimeSpan.SECOND_TO_TICK);

  public static create(
    h: number = 0,
    m: number = 0,
    s: number = 0,
    d: number = 0
  ) {
    return new TimeSpan(
      (((d * 24 + h) * 60 + m) * 60 + s) * TimeSpan.SECOND_TO_TICK
    );
  }

  public static createFromSeconds(s: number) {
    return new TimeSpan(s * TimeSpan.SECOND_TO_TICK);
  }

  public static createFromMinutes(m: number) {
    return new TimeSpan(m * TimeSpan.SECOND_TO_TICK * 60);
  }

  public static createFromPerformanceNow() {
    return new TimeSpan(performance.now() * 10000);
  }

  public static createFromExactNow() {
    return new TimeSpan(
      Math.floor((performance.now() + performance.timeOrigin) * 10000)
    );
  }

  public static createFromNow() {
    return new TimeSpan(Date.now() * 10000);
  }

  public static createFromDate(date: Date, skipUTC: boolean = false) {
    const utcMs = skipUTC ? 0 : new Date().getTimezoneOffset() * 60000;
    const ms = date.getTime() - utcMs;

    return new TimeSpan(ms * 10000);
  }

  public static createFromMs(ms: number, skipUTC: boolean = false) {
    const utcMs = skipUTC ? 0 : new Date().getTimezoneOffset() * 60000;
    const delayMs = ms - utcMs;
    return new TimeSpan(delayMs * 10000);
  }

  public static DiffDates(decreasing: Date, negative: Date) {
    return decreasing.getTime() - negative.getTime();
  }

  public static DiffDateAndTimeSpan(
    date: Date,
    timeSpan: TimeSpan,
    useUtc = false
  ): Date {
    const dateTime = date.getTime();
    const diff =
      dateTime -
      timeSpan.allMiliseconds +
      (useUtc ? date.getTimezoneOffset() * 60000 : 0);
    return new Date(diff);
  }

  public static AddDateAndTimeSpan(date: Date, timeSpan: TimeSpan): Date {
    const dateTime = date.getTime();
    const sum = dateTime + timeSpan.toBrowserTimestamp();
    return new Date(sum);
  }

  public toUnixTimestamp() {
    return this.floorAllSeconds;
  }

  public toBrowserTimestamp() {
    return this.floorAllMiliseconds;
  }

  public toPerformanceTimestamp() {
    return this.miliseconds;
  }

  public get allMiliseconds() {
    return this._ticks * TimeSpan.TICK_TO_MS;
  }

  public get ticks() {
    return this._ticks;
  }

  public get allSeconds() {
    return this._ticks * TimeSpan.TICK_TO_SECOND;
  }

  public get allMinutes() {
    return (this._ticks * TimeSpan.TICK_TO_SECOND) / 60;
  }

  public get allHours() {
    return (this._ticks * TimeSpan.TICK_TO_SECOND) / 3600;
  }

  public get allDays() {
    return (this._ticks * TimeSpan.TICK_TO_SECOND) / (3600 * 24);
  }

  public get floorAllMiliseconds() {
    return Math.floor(this.allMiliseconds);
  }

  public get floorAllSeconds() {
    return Math.floor(this.allSeconds);
  }

  public get floorAllMinutes() {
    return Math.floor(this.allMinutes);
  }

  public get floorAllHours() {
    return Math.floor(this.allHours);
  }

  public get floorAllDays() {
    return Math.floor(this.allDays);
  }

  public get miliseconds() {
    return this.floorAllMiliseconds % 1000;
  }

  public get seconds() {
    return this.floorAllSeconds % 60;
  }

  public get minutes() {
    return this.floorAllMinutes % 60;
  }

  public get hours() {
    return this.floorAllHours % 24;
  }

  public get days() {
    return this.floorAllDays;
  }

  public toString() {
    const d = this.days;
    const h = this.hours;
    const m = this.minutes;
    const s = this.seconds;

    let str = d === 0 ? "" : `${d} `;
    if (h >= 10) {
      str += `${h}:`;
    } else if (h > 0) {
      str += `0${h}:`;
    }

    if (m >= 10) {
      str += `${m}:`;
    } else if (m > 0) {
      str += `0${m}:`;
    }

    if (s >= 10) {
      str += s.toString();
    } else {
      str += `0${s}`;
    }

    return str;
  }

  public toTimeString() {
    const h = this.hours;
    const m = this.minutes;
    const s = this.seconds;

    const t = (n: number) => (n >= 10 ? n.toString() : "0" + n);

    return `${t(h)}:${t(m)}:${t(s)}`;
  }
}
