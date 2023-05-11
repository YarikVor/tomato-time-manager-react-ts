export default class AudioPlayer {
  private static audio: HTMLAudioElement;

  public static PlayTimer() {
    this.audio ??= new Audio("sound/timer.mp3");
    this.audio.play();
  }
}
