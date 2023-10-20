export enum LOG_LEVELS {
  DEBUG,
  INFO,
  WARN,
  ERROR
}

export interface Logger {

  debug(message: string, ...args: unknown[]): void;

  warn(message: string, ...args: unknown[]): void;

  error(message: string, ...args: unknown[]): void;

  info(message: string, ...args: unknown[]): void;

  setLevel(level: LOG_LEVELS): void;
}

class DefaultLogger implements Logger {
  private level: LOG_LEVELS = LOG_LEVELS.DEBUG;

  public constructor(private readonly name: string) {
  }

  public setLevel(level: LOG_LEVELS): void {
    this.level = level;
  }

  debug(message: string, ...args: unknown[]): void {
    this.log(LOG_LEVELS.DEBUG, message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.log(LOG_LEVELS.ERROR, message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.log(LOG_LEVELS.INFO, message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log(LOG_LEVELS.WARN, message, ...args);
  }

  private log(msgLevel: LOG_LEVELS, message: string, ...args: unknown[]): void {
    const messageLevel = asLogLevelName(msgLevel);
    if (msgLevel >= this.level) {
      console.log(`[${new Date().toISOString()}] [${this.name}] [${messageLevel}] - ${message}`, ...args);
    }
  }
}

const getLogger = (name: string) => {
  const logLevel = asLogLevel(process.env.NEXT_PUBLIC_LOG_LEVEL || "");
  const logger = asLogger(process.env.NEXT_PUBLIC_LOGGER || "", name);
  logger.setLevel(logLevel);
  return logger;
};

export const asLogLevelName = (level: LOG_LEVELS): string => {
  switch (level) {
    case LOG_LEVELS.DEBUG:
      return "DEBUG";
    case LOG_LEVELS.INFO:
      return "INFO";
    case LOG_LEVELS.WARN:
      return "WARN";
    case LOG_LEVELS.ERROR:
      return "ERROR";
    default:
      return "DEBUG";
  }
};

const asLogger = (logger: string, name: string): Logger => {
  switch (logger) {
    case "default":
      return new DefaultLogger(name);
    default:
      return new DefaultLogger(name);
  }
};

const asLogLevel = (level: string): LOG_LEVELS => {
  switch (level) {
    case "DEBUG":
      return LOG_LEVELS.DEBUG;
    case "INFO":
      return LOG_LEVELS.INFO;
    case "WARN":
      return LOG_LEVELS.WARN;
    case "ERROR":
      return LOG_LEVELS.ERROR;
    default:
      return LOG_LEVELS.DEBUG;
  }
};

export default getLogger;