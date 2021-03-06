import * as React from "react";
import { Logger, LogLevel } from "@pnp/logging";
import isEqual from "lodash/isEqual";

import "./LQDWebPartTitle.css";
import { ILQDStandardProps } from "../Common.model";

export interface ILQDWebPartTitleProps extends ILQDStandardProps {
  /**
   * (Optional) HTMLHeaderElement attributes that will be applied to the root element of the component.
   */
  rootElementAttributes?: React.HTMLAttributes<HTMLHeadingElement>;
  /**
   * (Optional) Title of the web part.
   */
  title?: string;
  /**
   * (Optional) Placeholder to be shown when Title is null.
   */
  placeholder?: string;
  /**
   * Is the web part title editable.
   */
  editMode: boolean;
  /**
   * Method to update the data source for the web part's title.
   */
  updateTitle: (title: string) => void;
}

export interface ILQDWebPartTitleState {
}

export class LQDWebPartTitleState implements ILQDWebPartTitleState {
  constructor() { }
}

export default class LQDWebPartTitle extends React.Component<ILQDWebPartTitleProps, ILQDWebPartTitleState> {
  private LOG_SOURCE: string = "LQDWebPartTitle";

  constructor(props: ILQDWebPartTitleProps) {
    super(props);
    this.LOG_SOURCE = props.dataComponent || "LQDWebPartTitle";
    this.state = new LQDWebPartTitleState();
  }

  public shouldComponentUpdate(nextProps: Readonly<ILQDWebPartTitleProps>, nextState: Readonly<ILQDWebPartTitleState>) {
    if ((isEqual(nextState, this.state) && isEqual(nextProps, this.props)))
      return false;
    return true;
  }

  private saveTitle = (event: React.FocusEvent<HTMLDivElement>) => {
    event.preventDefault();
    let title = (event.target as HTMLDivElement).innerText;
    this.props.updateTitle(title);
  }

  public render(): React.ReactElement<ILQDWebPartTitleProps> {
    try {
      const className = (this.props.rootElementAttributes?.className) ? `lqd-webpart-header ${this.props.rootElementAttributes?.className}` : "lqd-webpart-header";
      return (
        <h3 data-component={this.LOG_SOURCE} {...this.props.rootElementAttributes} className={className}>
          <div
            role="textbox"
            placeholder={this.props.placeholder || ""}
            aria-placeholder={this.props.placeholder || ""}
            contentEditable={this.props.editMode}
            suppressContentEditableWarning={true}
            onBlur={this.saveTitle}
          >
            {this.props.title || this.props.children}
          </div>
        </h3>
      );
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (render)`, LogLevel.Error);
      return null;
    }
  }
}