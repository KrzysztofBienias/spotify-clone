import Header from '@/components/Header';

interface Props {}

const Search: React.FC<Props> = () => {
    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">Search</h1>
                    <input placeholder="What do you want to listen to?" />
                </div>
            </Header>

            <div>Search result</div>
        </div>
    );
};

export default Search;
