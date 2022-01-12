<Box sx={{ flexgrow: 1 }}>
    <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="stretch"
    >
        <Grid item xs={6}>
            <Item>
                <h3>{givenText.join(' ')}</h3>
            </Item>
        </Grid>
        <Grid item xs={6}>
            <Item>
                <h3>{text}</h3>
            </Item>
        </Grid>
    </Grid>
</Box>


// KEY FUNCITON:
function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ")
    return wordsArr.filter(word => word !== "").length
}