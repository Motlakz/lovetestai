import { motion } from "framer-motion"

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    icon: React.ReactNode;
}
export const NameInput: React.FC<InputProps> = ({ placeholder, value, onChange, icon }) => (
    <motion.div className="relative mb-4">
        <motion.span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70">
            {icon}
        </motion.span>
        <motion.input
            type="text"
            placeholder={placeholder}
            className="w-full p-3 pl-10 bg-pink-900/20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 backdrop-blur-sm text-white placeholder-white placeholder-opacity-70"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
        />
    </motion.div>
);
