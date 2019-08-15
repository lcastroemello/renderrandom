{
    !this.state.episodepage && (
        <div>
            <Route
                exact
                path="/chat"
                render={props => (
                    <div>
                        <Chat />
                    </div>
                )}
            />
        </div>
    );
}

{
    !this.state.adminMode && (
        <div>
            <Favorites />
        </div>
    );
}
