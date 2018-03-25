import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card, {CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    media: {
        height: 360,
    },
})

class BlogDetail extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid className={classes.root}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            alignItems='flex-start'
                            direction='row'
                            justify='flex-start'
                        >
                            <Grid item xs={12} sm={2} />
                            <Grid item xs={12} sm={8}>
                                <Card
                                >
                                    <CardHeader
                                        title="Shrimp and Chorizo Paella"
                                        subheader="September 14, 2016"
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image="https://images.pexels.com/photos/20861/pexels-photo.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb"
                                        title="haddeus McCotter of Michigan unsuccessfully"
                                    />
                                    <CardContent>
                                        Congressman Thaddeus McCotter of Michigan unsuccessfully sought the Republican Party's 2012 nomination for President of the United States. He announced his intention to run when he filed papers with the Federal Election Commission on July 1, 2011, he officially declared his candidacy the next day at a rock festival near Detroit.
                                        McCotter, who had served in Congress since 2003, was first mentioned as a potential presidential candidate on an April 2011 episode of Fox News' Red Eye w/ Greg Gutfeld. After entering the race two months later, McCotter based his campaign on "five core principles" listed on his campaign website, and used the slogan Seize Freedom!, derived from the title of his 2011 book. During the campaign, he focused on reform of government and Wall Street.
                                        Commentators noted McCotter's lack of name recognition hindered his chances for nomination. When included in Republican presidential preference polls, he regularly received less than one percent support. Following a last-place finish in the Ames Straw Poll and the lack of any invitation to presidential debates, he dropped his candidacy on September 22, 2011, and endorsed Mitt Romney. Thereafter, McCotter reportedly wrote a television pilot, which was released to the media prior to his resignation from Congress in July 2012 amid a fraud investigation surrounding his congressional re-election campaign.
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={2} />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(BlogDetail))