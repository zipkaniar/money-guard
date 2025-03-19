import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransaction, deleteTransaction, getCategories } from '../../redux/transaction/transactionOps';
import penLogo from "../../assets/svg/pen.svg";
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';

const DashBoardTable = () => {
    const { transactions, error } = useSelector((state) => state.transaction);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        if (token) {
            dispatch(getTransaction());
            fetchCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, token]);

    const fetchCategories = async () => {
        try {
            const result = await dispatch(getCategories()).unwrap();
            const categoryMap = result.reduce((acc, category) => {
                acc[category.id] = category.name;
                return acc;
            }, {});
            setCategories(categoryMap);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const handleDelete = async (transactionId) => {
        if (token) {
            await dispatch(deleteTransaction({ transactionId }));
            dispatch(getTransaction());
        }
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditModalOpen(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(2);
        return `${day}.${month}.${year}`;
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col gap-4 w-full px-4">
            {/* Table Header */}
            <div className="hidden tablet:flex justify-between bg-[#523B7E99] rounded-[20px] text-[#FBFBFB] px-6 py-3">
                <div className="w-1/6">Date</div>
                <div className="w-1/6">Type</div>
                <div className="w-1/6">Category</div>
                <div className="w-1/6">Comment</div>
                <div className="w-1/6">Sum</div>
                <div className="w-1/6"></div>
            </div>

            {/* Transaction List */}
            {transactions.map((transaction) => (
                <div key={transaction.id} className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between border border-gray-700 rounded-lg p-4 bg-transparent">
                    {/* Date */}
                    <div className="flex justify-between items-center tablet:w-1/6 mb-2 tablet:mb-0">
                        <span className="text-[#FBFBFB] tablet:hidden">Date:</span>
                        <span className="text-[#FBFBFB]">{formatDate(transaction.transactionDate)}</span>
                    </div>
                    {/* Type */}
                    <div className="flex justify-between items-center tablet:w-1/6 mb-2 tablet:mb-0">
                        <span className="text-[#FBFBFB] tablet:hidden">Type:</span>
                        <span className="text-[#FBFBFB]">{transaction.type === "INCOME" ? "+" : "-"}</span>
                    </div>
                    {/* Category */}
                    <div className="flex justify-between items-center tablet:w-1/6 mb-2 tablet:mb-0">
                        <span className="text-[#FBFBFB] tablet:hidden">Category:</span>
                        <span className="text-[#FBFBFB]">{categories[transaction.categoryId] || "Unknown"}</span>
                    </div>
                    {/* Comment */}
                    <div className="flex justify-between items-center tablet:w-1/6 mb-2 tablet:mb-0 break-all">
                        <span className="text-[#FBFBFB] tablet:hidden">Comment:</span>
                        <span className="text-[#FBFBFB]">{transaction.comment || "-"}</span>
                    </div>
                    {/* Sum */}
                    <div className="flex justify-between items-center tablet:w-1/6 mb-4 tablet:mb-0">
                        <span className="text-[#FBFBFB] tablet:hidden">Sum:</span>
                        <span className={`${transaction.type === "INCOME" ? "text-[#FFB627]" : "text-[#FF868D]"}`}>
                            {Math.abs(transaction.amount).toFixed(2)}
                        </span>
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end gap-2 tablet:w-1/6">
                        <button
                            className="border-none outline-none focus:ring-0 p-2 bg-transparent"
                            onClick={() => handleEdit(transaction)}
                        >
                            <img src={penLogo} alt="Edit" className="w-6 h-6 rounded p-1" />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(transaction.id)}
                            className="bg-gradient-to-r from-[#ebac44] to-[#a144b5] rounded-[20px] px-3 py-2 text-white transition-opacity hover:opacity-90"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* Edit Modal */}
            {selectedTransaction && (
                <ModalEditTransaction
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    transaction={selectedTransaction}
                />
            )}
        </div>
    );
};

export default DashBoardTable;