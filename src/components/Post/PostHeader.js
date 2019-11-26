import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import TagList from "../TagList";
import injectSheet from "react-jss";
import Header from "../Header";

function fixDateString(str) {
  return typeof str === "string" && str.length === "yyyy-mm-DD".length ? str + "T00:00" : str;
}

const styles = theme => ({
  header: {
    margin: "0 0 3em"
  },
  title: {
    color: theme.main.colors.title,
    fontSize: `${theme.main.fonts.title.size}em`,
    letterSpacing: "-0.04em",
    fontWeight: theme.main.fonts.title.weight,
    lineHeight: theme.main.fonts.title.lineHeight,
    margin: "0 0 0.4em",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: `${theme.main.fonts.title.sizeM}em`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      fontSize: `${theme.main.fonts.title.sizeL}em`,
      letterSpacing: "-0.05em"
    }
  },
  subTitle: {
    color: theme.main.colors.subTitle,
    fontSize: `${theme.main.fonts.subTitle.size}em`,
    lineHeight: theme.main.fonts.subTitle.lineHeight,
    fontWeight: theme.main.fonts.subTitle.weight,
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: `${theme.main.fonts.subTitle.sizeM}em`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      fontSize: `${theme.main.fonts.subTitle.sizeL}em`
    }
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    flexFlow: "row",
    lineHeight: "1.55",
    width: "100%",
    "& h3": {
      flexFlow: "column",
      width: "50%",
      display: "flex",
      justifyContent: "space-between",
      maxWidth: "300px",
      fontSize: "0.8em",
      margin: "0.2rem 0",
      // "& label": {
      //   width: "255px",
      //   fontSize: "11px",
      //   fontWeight: 700,
      //   marginRight: "4px"
      // },
      "& span.human-date": {
        width: "100%",
        fontSize: "0.8rem"
      },
      "& small": {
        width: "100%",
        fontSize: "0.8rem"
        // fontWeight: 700
        // marginLeft: "4px"
      }
    },
    "& a": {
      color: theme.base.colors.link,
      "&:hover": {
        color: theme.base.colors.linkHover
      }
    },
    fontSize: `${theme.main.fonts.meta.size}em`,
    fontWeight: theme.main.fonts.meta.weight,
    color: theme.main.colors.meta
  },
  tags: {
    width: "100%",
    margin: "0.1em 0"
  }
});

const getDateLabel = (date, label, className = "text-left") => {
  if (!date) return <span date={date} />;

  const aDate = new Date(fixDateString(date));
  return (
    <h3 className={"post-details " + className}>
      <small>
        {label}&#160;{formatDistance(new Date(), aDate)}&#160;ago
      </small>
      <span className="human-date">{format(aDate, "MMM do, yyyy")}</span>
    </h3>
  );
};

const PostHeader = props => {
  const { classes, date, modified, tags } = props;
  // console.log("title", title, "post.props", props);

  return (
    <Header {...props}>
      <div className={classes.meta}>
        {getDateLabel(date, "published")}
        {getDateLabel(modified, "updated", "text-right")}
      </div>
      <div className={classes.tags}>
        <TagList tags={tags} />
      </div>
    </Header>
  );
};

PostHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  tags: PropTypes.array,
  modified: PropTypes.string,
  date: PropTypes.string.isRequired
};

export default injectSheet(styles)(PostHeader);
